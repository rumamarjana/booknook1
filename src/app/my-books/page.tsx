import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BooksTable, {
  BooksTableSkeleton,
  PlusIcon,
} from "@/components/shared/BooksTable";

export const metadata: Metadata = {
  title: "My Books Management | BookNook",
  description: "Manage every book on the BookNook bookshelf.",
};

export default function MyBooksPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#fdfbf5] py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/60 sm:p-6">
          {/* Card header: title + add button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
            <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-slate-900 sm:text-2xl">
              My Books Management
            </h1>
            <Link
              href="/add-book"
              className="btn btn-sm gap-1.5 rounded-md border-none bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <PlusIcon />
              Add Book
            </Link>
          </div>

          <Suspense fallback={<BooksTableSkeleton />}>
            <BooksTable />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
