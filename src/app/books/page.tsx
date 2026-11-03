import type { Metadata } from "next";
import { Suspense } from "react";
import BooksGrid, { BooksGridSkeleton } from "@/components/shared/BooksGrid";

export const metadata: Metadata = {
  title: "BookNook | All Books",
  description: "Browse every book on the BookNook bookshelf.",
};

export default function AllBooksPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#fdfbf5] py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Section title + subtitle */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            All Books
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            Browse the full BookNook collection — hidden gems, fresh arrivals
            and timeless favourites, all on one shelf.
          </p>
        </div>

        <Suspense fallback={<BooksGridSkeleton />}>
          <BooksGrid />
        </Suspense>
      </div>
    </main>
  );
}
