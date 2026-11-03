"use client";

import { useEffect, useState } from "react";
import { authClient, useSession } from "../lib/auth-client";
import { toast } from "react-toastify";
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

                setBorrows(
                    data.filter(
                        (borrow: Borrow) =>
                            borrow.userEmail?.toLowerCase() === userEmail.toLowerCase()
                    )
                );
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
        }
    }, [userEmail, isPending]);

    // 2. Return book function
const handleReturn = async (id: string) => {
    if (returningId) return;


     const { data, error } = await authClient.token();

        if (error || !data?.token) {
            throw new Error("Authentication token not found!");
        }

        const token = data.token;

    try {
        setReturningId(id);

        const res = await fetch(
            `${API_URL}/borrows/${id}`,
            {
                method: "DELETE",
                 headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Return failed");
        }

        // Update UI without page reload
        setBorrows((prev) =>
            prev.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        status: "returned",
                        returnDate: new Date().toISOString(),
                    }
                    : item
            )
        );

        toast.success("Book returned successfully!");

    } catch (error) {
        console.error("Return Error:", error);

        toast.error(
            error instanceof Error
                ? error.message
                : "Failed to return book!"
        );

    } finally {
        setReturningId(null);
    }
};
    // 3. Loading state
    if (isPending || (loading && !!userEmail)) {
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

                    <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 shadow">
                        <table className="table table-zebra min-w-[640px]">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Borrow Date</th>
                                    <th>Return Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrows.map((borrow) => (
                                    <tr key={borrow._id}>
                                        <td>
                                            {borrow.bookImage ? (
                                                <Image
                                                    src={borrow.bookImage}
                                                    alt={borrow.bookTitle || "Book cover"}
                                                    width={56}
                                                    height={72}
                                                    unoptimized
                                                    className="h-[72px] w-14 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-[72px] w-14 items-center justify-center rounded bg-base-200 text-xs">
                                                    No Image
                                                </div>
                                            )}
                                        </td>
                                        <td className="font-medium">
                                            {borrow.bookTitle || "Untitled Book"}
                                        </td>
                                        <td>
                                            {borrow.borrowDate
                                                ? new Date(borrow.borrowDate).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                        <td>
                                            {borrow.returnDate
                                                ? new Date(borrow.returnDate).toLocaleDateString()
                                                : "Not Returned"}
                                        </td>
                                        <td>
                                            {borrow.status === "borrowed" ? (
                                                <button
                                                    onClick={() => handleReturn(borrow._id)}
                                                    disabled={returningId === borrow._id}
                                                    className="btn btn-primary btn-sm"
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
                                                <span className="badge badge-success">
                                                    Returned
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyBorrowsPage;