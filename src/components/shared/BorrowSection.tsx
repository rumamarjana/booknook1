"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import BorrowButton from "@/components/shared/BorrowButton";

type BorrowSectionProps = {
  book: {
    _id: string;
    title: string;
    photo: string;
  };
  available: boolean;
};

const BorrowSection = ({ book, available }: BorrowSectionProps) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Wait for the session to resolve before showing anything actionable
  if (isPending) {
    return <div className="skeleton btn h-9 w-40" />;
  }

  // Not logged in → send them to login first
  if (!user) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/login"
          className="btn btn-sm rounded-md border-none bg-[#12392f] px-6 text-white hover:bg-[#0d2b24]"
        >
          Log in to Borrow
        </Link>
        <span className="text-xs text-slate-500">
          You need an account to borrow books.
        </span>
      </div>
    );
  }

  // No copies left on the shelf
  if (!available) {
    return (
      <button
        type="button"
        disabled
        className="btn btn-sm cursor-not-allowed rounded-md border-none bg-slate-200 px-6 text-slate-500"
      >
        Not Available
      </button>
    );
  }

  // Logged in + copies available → open the borrow modal
  return (
    <BorrowButton
      book={book}
      user={{
        name: user.name ?? "",
        email: user.email ?? "",
      }}
    />
  );
};

export default BorrowSection;
