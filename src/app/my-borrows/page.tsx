"use client";

import { useEffect, useState } from "react";
import { useSession } from "../lib/auth-client";
// import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

interface Borrow {
    _id: string;
    bookId: string;
    bookTitle: string;
    bookImage: string;
    userEmail: string;
    borrowDate: string;
    returnDate?: string | null;
    dueDate?: string;
    status: "borrowed" | "returned";
}

const API_URL = "http://localhost:8000";

const MyBorrowsPage = () => {
    const { data: session, isPending } = useSession();

    const [borrows, setBorrows] = useState<Borrow[]>([]);
    const [loading, setLoading] = useState(true);
    const [returningId, setReturningId] = useState<string | null>(null);

    const userEmail = session?.user?.email;

    // 1. Fetch borrowed books
    useEffect(() => {
        const fetchMyBorrows = async () => {
            if (!userEmail) return;

            try {
                const res = await fetch(
                    `${API_URL}/my-borrows?email=${encodeURIComponent(userEmail)}`,
                    {
                        cache: "no-store",
                    }
                );

                const data = await res.json();

                console.log("Logged User:", userEmail);
                console.log("Borrow Data:", data);

                if (!res.ok) {
                    throw new Error(data.message || "Failed to load borrowed books");
                }

                setBorrows(data);
            } catch (error) {
                console.error("Fetch Error:", error);

                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Failed to load borrowed books"
                );
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) {
            fetchMyBorrows();
        } else if (!isPending) {
            setLoading(false);
        }
    }, [userEmail, isPending]);

    // 2. Return book function
    const handleReturn = async (borrowId: string) => {
        try {
            setReturningId(borrowId);

            const res = await fetch(
                `${API_URL}/my-borrows/return/${borrowId}`,
                {
                    method: "PATCH",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to return book");
            }

            toast.success(data.message || "Book returned successfully!");

            // Update UI immediately
            setBorrows((previousBorrows) =>
                previousBorrows.map((borrow) =>
                    borrow._id === borrowId
                        ? {
                            ...borrow,
                            status: "returned",
                            returnDate: new Date().toISOString(),
                        }
                        : borrow
                )
            );
        } catch (error) {
            console.error("Return Error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to return book"
            );
        } finally {
            setReturningId(null);
        }
    };

    // 3. Loading state
    if (isPending || loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // 4. Login check
    if (!session?.user) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold">
                    Please Login First
                </h2>

                <Link href="/login" className="btn btn-primary">
                    Login
                </Link>
            </div>
        );
    }

    // 5. Main UI
    return (
        <section className="min-h-screen bg-base-200 px-4 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        My Borrowed Books
                    </h1>

                    <p className="mt-3 text-base-content/60">
                        Manage your borrowed books and return them when finished.
                    </p>
                </div>

                {/* Summary */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div className="rounded-xl bg-base-100 p-5 shadow">
                        <p className="text-sm text-base-content/60">
                            Total Borrowed Records
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {borrows.length}
                        </h2>
                    </div>

                    <div className="rounded-xl bg-base-100 p-5 shadow">
                        <p className="text-sm text-base-content/60">
                            Currently Borrowed
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-primary">
                            {borrows.filter(
                                (item) => item.status === "borrowed"
                            ).length}
                        </h2>
                    </div>
                </div>

                {/* Empty State */}
                {borrows.length === 0 ? (
                    <div className="rounded-2xl bg-base-100 py-20 text-center shadow">
                        <h2 className="text-2xl font-bold">
                            No Borrowed Books!
                        </h2>

                        <p className="mt-3 text-base-content/60">
                            You have not borrowed any books yet.
                        </p>

                        <Link href="/books" className="btn btn-primary mt-6">
                            Browse Books
                        </Link>
                    </div>
                ) : (

                    /* Books Grid */
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {borrows.map((borrow) => (
                            <div
                                key={borrow._id}
                                className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-md transition hover:shadow-xl"
                            >

                                {/* Book Image */}
                                <div className="relative h-56 bg-base-200">
                                    {borrow.bookImage ? (
                                        <Image
                                            src={borrow.bookImage}
                                            alt={borrow.bookTitle || "Book cover"}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Book Information */}
                                <div className="space-y-4 p-5">

                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {borrow.bookTitle}
                                        </h2>

                                        <p className="mt-2 text-sm text-base-content/60">
                                            Borrower: {borrow.userEmail}
                                        </p>
                                    </div>

                                    {/* Dates */}
                                    <div className="space-y-2 text-sm">
                                        <p>
                                            <strong>Borrow Date:</strong>{" "}
                                            {borrow.borrowDate
                                                ? new Date(borrow.borrowDate).toLocaleDateString()
                                                : "N/A"}
                                        </p>

                                        <p>
                                            <strong>Due Date:</strong>{" "}
                                            {borrow.dueDate
                                                ? new Date(borrow.dueDate).toLocaleDateString()
                                                : "Not specified"}
                                        </p>

                                        {borrow.status === "returned" && (
                                            <p>
                                                <strong>Return Date:</strong>{" "}
                                                {borrow.returnDate
                                                    ? new Date(borrow.returnDate).toLocaleDateString()
                                                    : "N/A"}
                                            </p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <span
                                            className={`badge ${
                                                borrow.status === "returned"
                                                    ? "badge-success"
                                                    : "badge-warning"
                                            }`}
                                        >
                                            {borrow.status === "returned"
                                                ? "Returned"
                                                : "Borrowed"}
                                        </span>
                                    </div>

                                    {/* Return Button */}
                                    {borrow.status === "borrowed" ? (
                                        <button
                                            onClick={() => handleReturn(borrow._id)}
                                            disabled={returningId === borrow._id}
                                            className="btn btn-primary w-full"
                                        >
                                            {returningId === borrow._id ? (
                                                <>
                                                    <span className="loading loading-spinner loading-sm"></span>
                                                    Returning...
                                                </>
                                            ) : (
                                                "Return Book"
                                            )}
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className="btn btn-success w-full"
                                        >
                                            ✓ Returned
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyBorrowsPage;