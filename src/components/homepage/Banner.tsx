import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

/* Banner photo: "NYC Public Library Research Room" via Wikimedia Commons.
   Source: https://commons.wikimedia.org/wiki/File:NYC_Public_Library_Research_Room_Jan_2006-1-_3.jpg */

type Book = {
  _id: string;
  title?: string;
  author?: string;
  category?: string;
  photo?: string;
};

/** Featured books from the same API the /books page uses. */
async function FeaturedBooks() {
  let books: Book[] = [];

  try {
    const res = await fetch("http://localhost:8000/books", {
      cache: "no-store",
    });
    books = (await res.json()) as Book[];
  } catch {
    // Server unreachable — just show the empty grid; the "See All Books"
    // link below still works.
  }

  const featured = books.slice(0, 3);

  return (
    <div className="grid w-full grid-cols-2 justify-items-center gap-4 sm:grid-cols-3">
      {featured.map((book) => {
        const title = book.title?.trim();
        return (
          <Link
            key={book._id}
            href="/books"
            className="block w-full max-w-36 rounded-xl bg-[#fdfbf5] p-3 text-slate-800 shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="h-40 w-full overflow-hidden rounded-md bg-slate-100">
              {/* Cover URLs are user-supplied (any host), so the plain img tag is
                  intentional here — next/image would reject unlisted hosts. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.photo}
                alt={`Cover of ${title || "a book"}`}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-2 truncate text-sm font-bold">
              {title || "Untitled Book"}
            </h3>
            <p className="truncate text-xs text-slate-500">
              {book.author?.trim() ? `by ${book.author.trim()}` : "Unknown author"}
            </p>
            {book.category?.trim() && (
              <span className="badge badge-sm mt-1 border-none bg-sky-100 text-sky-700">
                {book.category.trim()}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

function FeaturedBooksSkeleton() {
  return (
    <div className="grid w-full grid-cols-2 justify-items-center gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="w-full max-w-36 rounded-xl bg-[#fdfbf5] p-3 shadow-md">
          <div className="skeleton h-40 w-full rounded-md bg-slate-200" />
          <div className="skeleton mt-2 h-4 w-3/4 rounded bg-slate-200" />
          <div className="skeleton mt-1 h-3 w-1/2 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-[#12392f] text-white">
      {/* Library photo, right side, teal cuts into it with a curved edge */}
      <div className="absolute inset-y-0 right-0 w-[62%] max-lg:hidden">
        <Image
          src="/images/banner-library.jpg"
          alt="Persons reading at long tables in the New York Public Library's Rose Main Reading Room"
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover [clip-path:ellipse(85%_130%_at_80%_-10%)]"
        />
      </div>
      {/* Cream sweep across the bottom-right corner */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 hidden h-64 w-[46%] bg-[#f6f1e7] [clip-path:ellipse(75%_130%_at_78%_110%)] lg:block"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-center lg:gap-6 lg:py-20">
        {/* Left: heading + CTA */}
        <div className="max-w-xl">
          <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl xl:text-[2.75rem]">
            Your Local Digital Lending Ecosystem
          </h2>
          <p className="mt-4 max-w-md text-sm text-white/85 md:text-[15px]">
            Browse Thousands of Books, Connect with Readers, and Manage Your
            Personal Library Online.
          </p>
          <Link
            href="/books"
            className="btn mt-6 border-none bg-emerald-500 px-8 text-white hover:bg-emerald-600"
          >
            Browse Books
          </Link>
        </div>

        {/* Right: featured book cards + See All Books */}
        <div className="flex flex-1 flex-col items-center gap-4 lg:max-w-xl lg:flex-none lg:pb-6">
          <Suspense fallback={<FeaturedBooksSkeleton />}>
            <FeaturedBooks />
          </Suspense>
          <Link
            href="/books"
            className="btn btn-sm border-none bg-[#12392f] px-6 text-white hover:bg-[#0d2b24]"
          >
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
