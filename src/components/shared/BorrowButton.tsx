"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Book = {
  _id: string;
  title: string;
  photo: string;
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
    modalRef.current?.showModal();
  };

  const handleBorrow = async () => {
    const borrowData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.photo,
      userName: user.name,
      userEmail: user.email,
      borrowDate: new Date().toISOString(),
      returnDate: new Date(
        Date.now() + 14 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Borrow failed!");
        return;
      }

      modalRef.current?.close();
      // Copies count is server-rendered — refresh so the $inc shows up
      router.refresh();
      toast.success(
        `"${book.title.trim() || "Book"}" has been borrowed successfully. 📚`,
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Borrow Link Button — opens the daisyUI dialog below */}
      <button onClick={openModal} className="link link-hover text-sm font-semibold text-emerald-700">
        Borrow This Book
      </button>

      {/* DaisyUI Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-sm">
          <h3 className="text-lg font-bold">Borrow This Book</h3>

          {/* Book preview */}
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            {book.photo.trim() ? (
              /* eslint-disable-next-line @next/next/no-img-element */
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
                14 days from the day you confirm.
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
              disabled={loading}
              className="btn border-none bg-[#12392f] text-white hover:bg-[#0d2b24]"
            >
              {loading ? "Borrowing..." : "Confirm Borrow"}
            </button>
          </div>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default BorrowButton;
