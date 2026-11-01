type Book = {
  _id: string;
  title?: string;
  author?: string;
  category?: string;
  photo?: string;
};

function ViewDetailsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BooksGridSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="rounded-xl bg-white p-3 shadow-md shadow-slate-200/60">
          <div className="skeleton h-40 w-full rounded-md" />
          <div className="skeleton mt-2 h-4 w-3/4 rounded" />
          <div className="skeleton mt-1 h-3 w-1/2 rounded" />
          <div className="skeleton btn mt-2 w-full" />
        </div>
      ))}
    </div>
  );
}

async function BooksGridContent() {
  let books: Book[] = [];

  try {
    const res = await fetch("http://localhost:8000/books", {
      cache: "no-store",
    });
    books = (await res.json()) as Book[];
  } catch {
    return (
      <div
        role="status"
        className="alert alert-error alert-sm mt-8 justify-start rounded-lg text-sm"
      >
        <span>
          Could not load the books. Make sure the book server is running on
          http://localhost:8000 and try again.
        </span>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm font-semibold text-slate-700">No books yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Be the first to add a book to the shelf!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => {
        const title = book.title?.trim();
        return (
          <div
            key={book._id}
            className="rounded-xl bg-white p-3 text-slate-800 shadow-md shadow-slate-200/60 transition-shadow hover:shadow-lg"
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
            <button
              type="button"
              className="btn btn-xs mt-2 flex w-full items-center gap-1 border-none bg-[#12392f] text-white hover:bg-[#0d2b24]"
            >
              <ViewDetailsIcon />
              View Details
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function BooksGrid() {
  return (
    <BooksGridContent />
  );
}

export { BooksGridSkeleton };
