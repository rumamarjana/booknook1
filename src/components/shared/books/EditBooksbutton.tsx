"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Book = {
    _id: string;
    title?: string;
    author?: string;
    category?: string;
    totalCopies?: number | string;
    description?: string;
    photo?: string;
    userName?: string;
    userEmail?: string;
    createdAt?: string;
};

type EditFormState = {
    title: string;
    author: string;
    category: string;
    totalCopies: string;
    description: string;
    photo: string;
    userName: string;
    userEmail: string;
};

const CATEGORIES = [
    "Fiction",
    "Non-Fiction",
    "Fantasy",
    "Science",
    "History",
    "Biography",
    "Self-help",
    "Motivational",
    "Technology",
];


function toFormState(book: Partial<Book>): EditFormState {
    const category = book.category?.trim();
    return {
        title: book.title?.trim() || "",
        author: book.author?.trim() || "",
        category: category && CATEGORIES.includes(category) ? category : "Fiction",
        totalCopies: String(book.totalCopies ?? "1"),
        description: book.description?.trim() || "",
        photo: book.photo?.trim() || "",
        userName: book.userName?.trim() || "",
        userEmail: book.userEmail?.trim() || "",
    };
}

export default function EditButtonPage({ book }: { book: Book }) {
    console.log(book)

    const [form, setForm] = useState<EditFormState>(() => toFormState(book));
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    // Auto-hide the success toast
    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    function getDialog(): HTMLDialogElement | null {
        return document.getElementById(
            `modal-${book._id}`,
        ) as HTMLDialogElement | null;
    }

    function onInputChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function openModal() {
        getDialog()?.showModal();

        // Pull the full book record so every AddBook-form field starts filled in
        setLoading(true);
        fetch(`http://localhost:8000/books/${book._id}`)
            .then((res) => res.json())
            .then((data: Book) => setForm(toFormState(data)))
            .catch(() => setForm(toFormState(book))) // fall back to the row data
            .finally(() => setLoading(false));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            ...form,
            totalCopies: Number(form.totalCopies),
        };



        const res = await fetch(
            `http://localhost:8000/books/${book._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
        );

        const responseData = await res.json();
        console.log(responseData);
         if (res.ok) {
        setToast(`"${form.title}" has been updated successfully.`);
        getDialog()?.close();
       }
    };


return (
    <div>
        {/* Open Modal Button */}
        <button
            className="btn btn-sm h-8 min-w-14 rounded-md border-none bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-700"
            onClick={openModal}
        >
            Edit
        </button>

        {/* Modal */}
        <dialog id={`modal-${book._id}`} className="modal">
            <div className="modal-box max-w-2xl">
                <h3 className="font-bold text-xl mb-5">
                    Edit Book{" "}
                    <span className="text-sm font-medium text-slate-500">
                        (form starts with the book&apos;s current data)
                    </span>
                </h3>

                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
                        <span className="loading loading-spinner loading-sm" />
                        Loading book data...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor={`title-${book._id}`}
                                    className="mb-1 block text-xs font-semibold text-slate-700"
                                >
                                    Book Title
                                </label>
                                <input
                                    id={`title-${book._id}`}
                                    name="title"
                                    type="text"
                                    placeholder="Book Title"
                                    value={form.title}
                                    onChange={onInputChange}
                                    className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={`author-${book._id}`}
                                    className="mb-1 block text-xs font-semibold text-slate-700"
                                >
                                    Author Name
                                </label>
                                <input
                                    id={`author-${book._id}`}
                                    name="author"
                                    type="text"
                                    placeholder="Author Name"
                                    value={form.author}
                                    onChange={onInputChange}
                                    className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={`category-${book._id}`}
                                    className="mb-1 block text-xs font-semibold text-slate-700"
                                >
                                    Category
                                </label>
                                <select
                                    id={`category-${book._id}`}
                                    name="category"
                                    value={form.category}
                                    onChange={onInputChange}
                                    className="select select-sm w-full rounded-lg border-slate-200 bg-white text-sm focus:border-emerald-600 focus:outline-none"
                                >
                                    {CATEGORIES.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor={`totalCopies-${book._id}`}
                                    className="mb-1 block text-xs font-semibold text-slate-700"
                                >
                                    Total Copies
                                </label>
                                <input
                                    id={`totalCopies-${book._id}`}
                                    name="totalCopies"
                                    type="number"
                                    min="1"
                                    placeholder="Enter total copies"
                                    value={form.totalCopies}
                                    onChange={onInputChange}
                                    className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor={`description-${book._id}`}
                                    className="mb-1 block text-xs font-semibold text-slate-700"
                                >
                                    Short Description
                                </label>
                                <textarea
                                    id={`description-${book._id}`}
                                    name="description"
                                    rows={3}
                                    placeholder="Short Description"
                                    value={form.description}
                                    onChange={onInputChange}
                                    className="textarea textarea-sm w-full resize-none rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor={`photo-${book._id}`}
                                    className="mb-1 block text-xs font-semibold text-slate-700"
                                >
                                    Book Image URL
                                </label>
                                <input
                                    id={`photo-${book._id}`}
                                    name="photo"
                                    type="url"
                                    placeholder="https://example.com/book-cover.jpg"
                                    value={form.photo}
                                    onChange={onInputChange}
                                    className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={`userName-${book._id}`}
                                    className="mb-1 block text-xs font-semibold text-slate-700"
                                >
                                    User Name
                                </label>
                                <input
                                    id={`userName-${book._id}`}
                                    name="userName"
                                    type="text"
                                    placeholder="Jana Doe"
                                    value={form.userName}
                                    onChange={onInputChange}
                                    className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor={`userEmail-${book._id}`}
                                    className="mb-1 block text-xs font-semibold text-slate-700"
                                >
                                    User Email
                                </label>
                                <input
                                    id={`userEmail-${book._id}`}
                                    name="userEmail"
                                    type="email"
                                    placeholder="jane.doe@example.com"
                                    value={form.userEmail}
                                    onChange={onInputChange}
                                    className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => getDialog()?.close()}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="btn btn-success">
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </dialog>

        {/* Success toast */}
        {toast && (
            <div className="toast toast-top toast-end z-50">
                <div className="alert alert-success text-sm font-medium shadow-lg">
                    <span>{toast}</span>
                </div>
            </div>
        )}
    </div>
);
}
