import type { Metadata } from "next";
import AddBookForm from "@/components/shared/add-book/AddBookForm";

export const metadata: Metadata = {
  title: "Add a New Book | BookNook",
  description: "Add a new book to your BookNook bookshelf.",
};

export default function AddBookPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#fdfbf5] py-10">
      <div className="mx-auto w-full max-w-xl px-4">
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/60">
          <AddBookForm />
        </div>
      </div>
    </main>
  );
}
