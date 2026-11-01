"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

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

/** localStorage key so future pages (e.g. My Books / All Books) can read saved books */
const BOOKS_STORAGE_KEY = "booknook:books";

export default function AddBookForm() {
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

  // const { title, author, category, description, userName, userEmail } = form;

  // const trimmed = {
  //   title: title.trim(),
  //   author: author.trim(),
  //   category,
  //   totalCopies: form.totalCopies.trim(),
  //   description: description.trim(),
  //   userName: userName.trim(),
  //   userEmail: userEmail.trim(),
  // };

  // Validate empty fields
  // if (Object.values(trimmed).some((value) => value === "")) {
  //   setStatus({
  //     type: "error",
  //     message: "Please fill in every field.",
  //   });
  //   return;
  // }

  // // Validate copies
  // const copies = Number(trimmed.totalCopies);

  // if (!Number.isInteger(copies) || copies < 1) {
  //   setStatus({
  //     type: "error",
  //     message: "Total Copies must be a whole number of at least 1.",
  //   });
  //   return;
  // }

  // Validate image
  // if (!file) {
  //   setStatus({
  //     type: "error",
  //     message: "Please select a book cover image.",
  //   });
  //   return;
  // }

  // Validate email
  // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.userEmail)) {
  //   setStatus({
  //     type: "error",
  //     message: "Please enter a valid email address.",
  //   });
  //   return;
  // }

  // setSubmitting(true);

  // try {
  //   // Upload image
  //   const cover = await uploadCover(file, trimmed.title);

  //   // Create book object
  //   const book = {
  //     ...trimmed,
  //     totalCopies: copies,
  //     cover,
  //     createdAt: new Date().toISOString(),
  //   };

  // setSubmitting(true);

  // Send data to Express API
  setSubmitting(true);
  try {
    const res = await fetch("http://localhost:8000/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form }),
    });
    const data = await res.json();
    console.log(data);

    setStatus({
      type: "success",
      message: `"${form.title.trim() || "Book"}" has been added to your bookshelf.`,
    });
  } catch {
    setStatus({
      type: "error",
      message: "Something went wrong while adding the book. Please try again.",
    });
  } finally {
    setSubmitting(false);
  }
};

    // resetForm();

    // setStatus({
    //   type: "success",
    //   message: `"${book.title}" has been added to your bookshelf.`,
    // });

  // } catch (error) {
    // setStatus({
      // type: "error",
      // message: "Something went wrong while adding the book. Please try again.",
    // });
  // } finally {
    // setSubmitting(false);
  // }
// };
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
          <label htmlFor="totalCopies" className="mb-1 block text-xs font-semibold text-slate-700">
            Total Copies
          </label>
          <input
            id="totalCopies"
            name="totalCopies"
            type="number"
            min={1}
            step={1}
            placeholder="Total Copies"
            value={form.totalCopies}
            onChange={onInputChange}
            className="input input-sm w-full rounded-lg border-slate-200 bg-white text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none"
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
