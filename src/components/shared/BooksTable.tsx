import EditButtonPage from "@/components/shared/books/EditBooksbutton";
import DeletedBooksbuttonPage from "@/components/shared/books/deletedBooksbutton";

type Book = {
  _id: string;
  title?: string;
  author?: string;
  category?: string;
  photo?: string;
  // Optional fields — the current API doesn't send these yet, but the UI
  // renders them automatically if the server ever starts returning them.
  borrowedAt?: string;
  returnDate?: string;
  createdAt?: string;
};

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/**
 * The current API has no date field, so derive the "Added On" date from the
 * timestamp embedded in the Mongo-style `_id` (first 8 hex chars = unix
 * seconds). Falls back to plain fields if the server ever adds them.
 */
function getBorrowDate(book: Book): Date | null {
  if (book.borrowedAt || book.createdAt) {
    const date = new Date(book.borrowedAt ?? book.createdAt ?? "");
    if (!Number.isNaN(date.getTime())) return date;
  }
  if (!book._id || book._id.length < 8) return null;
  const seconds = Number.parseInt(book._id.slice(0, 8), 16);
  if (Number.isNaN(seconds)) return null;
  const ms = seconds * 1000;
  const date = new Date(ms);
  const now = Date.now();
  const sane =
    ms > 0 &&
    date.getTime() <= now + 24 * 60 * 60 * 1000 &&
    date.getFullYear() >= 2000;
  return sane ? date : null;
}

function formatDate(value: Date) {
  return value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BooksTableSkeleton() {
  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-slate-200/70">
      <div className="flex items-center gap-4 bg-slate-50 px-4 py-3.5">
        <div className="skeleton size-4 rounded" />
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton hidden h-3 w-24 rounded sm:block" />
        <div className="skeleton hidden h-3 w-24 rounded sm:block" />
        <div className="skeleton h-3 w-16 rounded" />
      </div>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-t border-slate-100 px-4 py-3"
        >
          <div className="skeleton size-4 rounded" />
          <div className="h-12 w-12 shrink-0">
            <div className="skeleton size-12 rounded-lg" />
          </div>
          <div className="flex-1">
            <div className="skeleton h-4 w-44 rounded" />
            <div className="skeleton mt-1.5 h-3 w-24 rounded" />
          </div>
          <div className="skeleton hidden h-3 w-24 rounded sm:block" />
          <div className="skeleton hidden h-3 w-24 rounded sm:block" />
          <div className="flex gap-2">
            <div className="skeleton h-8 w-14 rounded-md" />
            <div className="skeleton h-8 w-14 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function BooksTableContent() {
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
        className="alert alert-error alert-sm mt-6 justify-start rounded-lg text-sm"
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
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm font-semibold text-slate-700">No books yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Click <span className="font-semibold text-emerald-700">+ Add Book</span> to create your first entry.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200/70">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200/70 bg-slate-50 text-slate-800">
            <th scope="col" className="w-12 px-4 py-3">
              {/* Select-all checkbox — decorative clone of the design */}
              <input
                type="checkbox"
                aria-label="Select all books"
                className="checkbox checkbox-sm rounded border-slate-300"
              />
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Book
            </th>
            <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">
              Category
            </th>
            <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">
              Added On
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const title = book.title?.trim() || "Untitled Book";
            const addedOn = getBorrowDate(book);
            return (
              <tr
                key={book._id}
                className="border-t border-slate-100 transition-colors hover:bg-violet-50/40"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label={`Select ${title}`}
                    className="checkbox checkbox-sm rounded border-slate-300"
                  />
                </td>
                {/* Covers come from user-supplied URLs (any host), so the plain
                    img tag is intentional — next/image would reject unlisted hosts. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                      <img
                        src={book.photo}
                        alt={`Cover of ${title}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="max-w-[220px] truncate font-semibold text-slate-900">
                        {title}
                      </p>
                      <p className="mt-0.5 max-w-[220px] truncate text-xs text-slate-500">
                        {book.author?.trim() || "Unknown author"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-slate-700 sm:table-cell">
                  {book.category?.trim() || "Fiction"}
                </td>
                <td className="hidden px-4 py-3 text-slate-700 sm:table-cell">
                  {addedOn ? formatDate(addedOn) : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <EditButtonPage book={book} />
                    <DeletedBooksbuttonPage book={book} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function BooksTable() {
  return <BooksTableContent />;
}

export { BooksTableSkeleton, PlusIcon };
