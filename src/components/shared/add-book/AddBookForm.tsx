"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";


type FormState = {
  title: string;
  author: string;
  category: string;
  totalCopies: string;
  description: string;
  photo: string;
  userName: string;
  userEmail: string;
};

type Status = {
  type: "success" | "error";
  message: string;
};

const EMPTY_FORM: FormState = {
  title: "",
  author: "",
  category: "Fiction",
  totalCopies: "1",
  description: "",
  photo: "",
  userName: "",
  userEmail: "",
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


const BOOKS_STORAGE_KEY = "booknook:books";

export default function AddBookForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  function onInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus(null);
  }

  // function resetForm() {
  //   setForm(EMPTY_FORM);
  //   clearFile();
  // }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const photo = form.photo.trim();
    const copies = Number(form.totalCopies);

    // Validate image URL
    if (photo === "") {
      setStatus({
        type: "error",
        message: "Please enter a book image URL.",
      });
      return;
    }

    if (!/^https?:\/\/\S+$/i.test(photo)) {
      setStatus({
        type: "error",
        message: "Book Image URL must be a valid link starting with http:// or https://.",
      });
      return;
    }

   
    
  
   
    setSubmitting(true);
    const { data, error } = await authClient.token()
      const token = data?.token
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({...form,
            totalCopies: copies,}),
      });
      const result = await res.json();
      console.log(result);

      setStatus({
        type: "success",
        message: `"${form.title.trim() || "Book"}" has been added to your bookshelf.`,
      });
      toast.success(
        `"${form.title.trim() || "Book"}" has been added to your bookshelf. ✅`,
      );
      router.push("/");
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong while adding the book. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className="text-lg font-bold text-slate-900">Add a New Book</h1>

      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1 block text-xs font-semibold text-slate-700">
            Book Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Book Title"
            value={form.title}
            onChange={onInputChange}
            className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="author" className="mb-1 block text-xs font-semibold text-slate-700">
            Author Name
          </label>
          <input
            id="author"
            name="author"
            type="text"
            placeholder="Author Name"
            value={form.author}
            onChange={onInputChange}
            className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-xs font-semibold text-slate-700">
            Category
          </label>
          <select
            id="category"
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
            htmlFor="totalCopies"
            className="mb-1 block text-xs font-semibold text-slate-700"
          >
            Total Copies
          </label>

          <input
            id="totalCopies"
            name="totalCopies"
            type="number"
            min="1"
            required
            placeholder="Enter total copies"
            value={form.totalCopies}
            onChange={onInputChange}
            className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="mb-1 block text-xs font-semibold text-slate-700">
            Short Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Short Description"
            value={form.description}
            onChange={onInputChange}
            className="textarea textarea-sm w-full resize-none rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="photo" className="mb-1 block text-xs font-semibold text-slate-700">
            Book Image URL
          </label>
          <input
            id="photo"
            name="photo"
            type="url"
            placeholder="https://example.com/book-cover.jpg"
            value={form.photo}
            onChange={onInputChange}
            className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
          />

        </div>

        <div>
          <label htmlFor="userName" className="mb-1 block text-xs font-semibold text-slate-700">
            User Name
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="Jana Doe"
            value={form.userName}
            onChange={onInputChange}
            className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="userEmail" className="mb-1 block text-xs font-semibold text-slate-700">
            User Email
          </label>
          <input
            id="userEmail"
            name="userEmail"
            type="email"
            placeholder="jane.doe@example.com"
            value={form.userEmail}
            onChange={onInputChange}
            className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
          />
        </div>
      </div>


      <button
        type="submit"
        disabled={submitting}
        className="btn mt-4 w-full border-none bg-emerald-600 text-sm text-white hover:bg-emerald-700 disabled:bg-emerald-600/60"
      >
        {submitting ? (
          <>
            <span className="loading loading-spinner loading-xs" />
            Adding Book...
          </>
        ) : (
          "Add Book"
        )}
      </button>
    </form>
  );
}
