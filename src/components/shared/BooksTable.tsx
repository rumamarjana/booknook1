import Link from "next/link";
import EditButtonPage from "./books/EditBooksbutton";
import DeletedBooksbuttonPage from "./books/deletedBooksbutton";
type Book = {
  _id: string;
  title?: string;
  author?: string;
  category?: string;
  photo?: string;
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

function formatAddedOn(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function BooksTableSkeleton() {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-slate-100">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-slate-100 p-4 last:border-none">
          <div className="skeleton size-4 rounded" />
          <div className="skeleton h-12 w-9 rounded-md" />
          <div className="flex-1">
            <div className="skeleton h-3.5 w-40 rounded" />
            <div className="skeleton mt-1.5 h-3 w-24 rounded" />
          </div>
          <div className="skeleton hidden h-3.5 w-20 rounded sm:block" />
          <div className="skeleton hidden h-3.5 w-20 rounded md:block" />
          <div className="flex gap-2">
            <div className="skeleton btn h-7 w-14" />
            <div className="skeleton btn h-7 w-14" />
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
    <div className="mt-6 -mx-2 overflow-x-auto sm:-mx-3">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-[#f6faf8] text-slate-700">
            <th scope="col" className="w-10 px-3 py-3">
              <input
                type="checkbox"
                aria-label="Select all books"
                className="size-4 accent-emerald-600"
              />
            </th>
            <th scope="col" className="px-3 py-3 font-semibold">
              Book
            </th>
            <th scope="col" className="px-3 py-3 font-semibold">
              Category
            </th>
            <th scope="col" className="px-3 py-3 font-semibold">
              Added On
            </th>
            <th scope="col" className="px-3 py-3 text-right font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const title = book.title?.trim() || "Untitled Book";
            return (
              <tr
                key={book._id}
                className="border-b border-slate-100 transition-colors last:border-none hover:bg-emerald-50/40"
              >
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    aria-label={`Select ${title}`}
                    className="size-4 accent-emerald-600"
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-9 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      {/* Cover URLs are user-supplied (any host), so the plain img tag is
                          intentional here — next/image would reject unlisted hosts. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={book.photo}
                        alt={`Cover of ${title}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/books/${book._id}`}
                        className="block truncate text-sm font-semibold text-emerald-800 hover:underline"
                      >
                        {title}
                      </Link>
                      <p className="truncate text-xs font-semibold text-slate-800">
                        {book.author?.trim() || "Unknown author"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-slate-600">
                  {book.category?.trim() || "—"}
                </td>
                <td className="px-3 py-3 text-slate-600">
                  {formatAddedOn(book.createdAt)}
                </td>
                <td className="px-3 py-3">
                  <div className="flex justify-end gap-2">
                    
                     <EditButtonPage book={book}/>
                    
                    <DeletedBooksbuttonPage book={book}/>
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
