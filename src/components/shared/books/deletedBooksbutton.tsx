
"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Book = {
  _id: string;
  title?: string;
};

const DeletedBooksbuttonPage = ({ book }: { book: Book }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  // Open Modal
  const openModal = () => {
    modalRef.current?.showModal();
  };

  // Delete Book
  const handleDeleteBooks = async () => {

    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error("Authentication token not found!");
    }

    const token = data.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/book/${book._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      modalRef.current?.close();
      toast.success(
        `"${book.title?.trim() || "Book"}" has been deleted successfully. 🗑️`,
      );
      router.refresh();
    } else {
      toast.error("Something went wrong while deleting the book. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-sm h-8 min-w-14 rounded-md border-none bg-rose-400 px-3 text-xs font-semibold text-white hover:bg-rose-500"
      >
        Delete
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-sm">

          <h3 className="text-lg font-bold">
            ⚠️ Delete Book?
          </h3>

          <p className="py-4 text-sm">
            Are you sure you want to remove
            <span className="font-semibold">
              {" "}{book.title}
            </span>
            ?
          </p>

          <div className="modal-action">

            <button
              onClick={() => modalRef.current?.close()}
              className="btn btn-sm"
            >
              Cancel
            </button>

            <button
              onClick={handleDeleteBooks}
              className="btn btn-sm btn-error"
            >
              Yes, Delete
            </button>

          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeletedBooksbuttonPage;
