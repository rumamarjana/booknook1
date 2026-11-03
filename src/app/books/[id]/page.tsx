import React, { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import BorrowSection from "@/components/shared/BorrowSection";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "BookNook | Book Details",
};

interface Props {
  params: Promise<{ id: string }>;
}

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
};

async function getBook(id: string): Promise<Book | null> {
   try {
    const jwtToken = await auth.api.getToken({
      headers: await headers(),
    });

  const token =jwtToken?.token
  console.log(token)

    const res = await fetch(`http://localhost:8000/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return (await res.json()) as Book;
  } catch (error) {
    console.error("Get Book Error:", error);
    return null;
  }
}

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
      {initials || "?"}
    </div>
  );
}

async function BookDetails({ params }: Props) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    return (
      <div className="mx-auto mt-16 max-w-md rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h1 className="text-lg font-bold text-slate-900">Book not found!</h1>
        <p className="mt-2 text-sm text-slate-500">
          This book may have been removed, or the server on localhost:8000 is
          unreachable.
        </p>
        <Link
          href="/books"
          className="btn btn-sm mt-5 border-none bg-[#12392f] px-6 text-white hover:bg-[#0d2b24]"
        >
          Back to All Books
        </Link>
      </div>
    );
  }

  const title = book.title?.trim() || "Untitled Book";
  const totalCopies = Number(book.totalCopies ?? 0);

  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,320px)_1fr]">
      {/* Cover */}
      <div className="mx-auto w-full max-w-xs overflow-hidden rounded-xl bg-white p-3 shadow-lg shadow-slate-200/60 md:mx-0 md:sticky md:top-6">
        <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-slate-100">
          {/* Cover URLs are user-supplied (any host), so the plain img tag is
              intentional here — next/image would reject unlisted hosts. */}
          {book.photo?.trim() ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={book.photo.trim()}
              alt={`Cover of ${title}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl">
              📖
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div>
        {/* Category */}
        {book.category?.trim() ? (
          <span className="badge border-none bg-sky-100 text-sky-700">
            {book.category.trim()}
          </span>
        ) : (
          <span className="badge border-none bg-slate-100 text-slate-500">
            Uncategorized
          </span>
        )}

        {/* Title */}
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-slate-900">
          {title}
        </h1>

        {/* Author */}
        <p className="mt-1 text-sm font-medium text-slate-500">
          {book.author?.trim() ? `by ${book.author.trim()}` : "Unknown author"}
        </p>

        <p className="mt-2 text-sm text-slate-600">
          <span className="font-semibold text-slate-800">
            {Math.max(totalCopies, 0)}
          </span>{" "}
          {totalCopies === 1 ? "copy" : "copies"} available on the shelf
        </p>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Description
          </h2>
          {book.description?.trim() ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {book.description.trim()}
            </p>
          ) : (
            <p className="mt-2 text-sm italic text-slate-400">
              No description was provided for this book.
            </p>
          )}
        </div>

        {/* Who added it */}
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-white p-4 shadow-md shadow-slate-200/60">
          <UserAvatar name={book.userName?.trim() || "?"} />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Added by
            </p>
            <p className="truncate text-sm font-bold text-slate-800">
              {book.userName?.trim() || "Unknown user"}
            </p>
            {book.userEmail?.trim() && (
              <a
                href={`mailto:${book.userEmail.trim()}`}
                className="truncate text-xs text-emerald-700 hover:underline"
              >
                {book.userEmail.trim()}
              </a>
            )}
          </div>
        </div>

        {/* Borrow This Book */}
        <div className="mt-8 flex items-center gap-3">
          <BorrowSection
            book={{
              _id: book._id,
              title: book.title?.trim() || "Untitled Book",
              photo: book.photo ?? "",
              totalCopies: totalCopies,
            }}
            available={totalCopies > 0}
          />

          {totalCopies <= 0 && (
            <span className="badge badge-error badge-outline">
              Not Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingDetails() {
  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,320px)_1fr]">
      <div className="mx-auto w-full max-w-xs rounded-xl bg-white p-3 shadow-lg shadow-slate-200/60 md:mx-0">
        <div className="skeleton aspect-[3/4] w-full rounded-md" />
      </div>
      <div>
        <div className="skeleton h-6 w-24 rounded" />
        <div className="skeleton mt-3 h-9 w-2/3 rounded" />
        <div className="skeleton mt-2 h-4 w-1/3 rounded" />
        <div className="skeleton mt-6 h-3 w-full rounded" />
        <div className="skeleton mt-2 h-3 w-full rounded" />
        <div className="skeleton mt-2 h-3 w-3/4 rounded" />
        <div className="skeleton btn mt-6 w-44" />
      </div>
    </div>
  );
}

const BookDetailsPage = async ({ params }: Props) => {
  return (
    <main className="flex flex-1 flex-col bg-[#fdfbf5] py-10">
      <div className="mx-auto w-full max-w-5xl px-4">
        <Link
          href="/books"
          className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← Back to All Books
        </Link>

        <div className="mt-6">
          <Suspense fallback={<LoadingDetails />}>
            <BookDetails params={params} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;
