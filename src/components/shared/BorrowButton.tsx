"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";
// import { authClient } from "@/app/lib/auth-client";

type Book = {
  _id: string;
  title: string;
  photo: string;
  totalCopies: number;
};

type BorrowModalProps = {
  book: Book;
  user: {
    name: string;
    email: string;
  };
};

const BorrowButton = ({ book, user }: BorrowModalProps) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    if (book.totalCopies <= 0) {
      toast.error("Book is not available!");
      return;
    }

    modalRef.current?.showModal();
  };

const handleBorrow = async () => {
    if (loading) return;

    const borrowData = {
        bookId: book._id,
        bookTitle: book.title,
        bookImage: book.photo,
        userName: user.name,
        userEmail: user.email,
    };

    try {
        setLoading(true);

        // Get JWT Token
        const { data: tokenData, error } = await authClient.token();

        if (error || !tokenData?.token) {
            throw new Error("Authentication token not found!");
        }

        // Send Borrow Request
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/borrows`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenData.token}`,
                },
                body: JSON.stringify(borrowData),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Borrow failed!");
        }

        modalRef.current?.close();

        toast.success(
            `"${book.title}" has been borrowed successfully! 📚`
        );

        router.refresh();

    } catch (error) {
        console.error("Borrow error:", error);

        toast.error(
            error instanceof Error
                ? error.message
                : "Something went wrong!"
        );

    } finally {
        setLoading(false);
    }
};

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        disabled={book.totalCopies <= 0}
        className="btn btn-sm rounded-md border-none bg-[#12392f] px-6 text-white hover:bg-[#0d2b24] disabled:bg-slate-300"
      >
        Borrow This Book
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-sm">
          <h3 className="text-lg font-bold">Borrow This Book</h3>

          {/* Book Preview */}
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            {book.photo.trim() ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.photo}
                alt={book.title}
                className="h-16 w-12 rounded object-cover"
              />
            ) : (
              <div className="flex h-16 w-12 items-center justify-center rounded bg-slate-200 text-xl">
                📖
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800">
                {book.title}
              </p>

              <p className="text-xs text-slate-500">
                Available copies: {book.totalCopies}
              </p>

              <p className="text-xs text-slate-500">
                Return within 14 days.
              </p>
            </div>
          </div>

          {/* User Name */}
          <div className="form-control mt-4 mb-3">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>

            <input
              type="text"
              value={user.name}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* User Email */}
          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text">User Email</span>
            </label>

            <input
              type="email"
              value={user.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              disabled={loading}
              className="btn btn-ghost"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleBorrow}
              disabled={loading || book.totalCopies <= 0}
              className="btn border-none bg-[#12392f] text-white hover:bg-[#0d2b24]"
            >
              {loading ? "Borrowing..." : "Confirm Borrow"}
            </button>
          </div>
        </div>

        {/* Click Outside to Close */}
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close modal">close</button>
        </form>
      </dialog>
    </>
  );
};

export default BorrowButton;