import Image from "next/image";

import BookCard from "@/components/BookCard";

/* Banner photo: "NYC Public Library Research Room" via Wikimedia Commons.
   Source: https://commons.wikimedia.org/wiki/File:NYC_Public_Library_Research_Room_Jan_2006-1-_3.jpg */

const books = [
  {
    title: "Educated",
    author: "by Tara Westover",
    rating: 5,
    cover: "https://picsum.photos/seed/booknook-cover-1/260/360",
  },
  {
    title: "The Alchemist",
    author: "by Paulo Coelho",
    rating: 4,
    cover: "https://picsum.photos/seed/booknook-cover-2/260/360",
  },
  {
    title: "Born a Crime",
    author: "by Trevor Noah",
    rating: 4,
    cover: "https://picsum.photos/seed/booknook-cover-3/260/360",
  },
];

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
          <button
            type="button"
            className="btn mt-6 border-none bg-emerald-500 px-8 text-white hover:bg-emerald-600"
          >
            Browse Books
          </button>
        </div>

        {/* Right: featured book cards + See All Books */}
        <div className="flex flex-1 flex-col items-center gap-4 lg:max-w-xl lg:flex-none lg:pb-6">
          <div className="grid w-full grid-cols-2 justify-items-center gap-4 sm:grid-cols-3">
            {books.map(({ title, author, rating, cover }) => (
              <BookCard
                key={title}
                title={title}
                author={author}
                rating={rating}
                cover={cover}
                className="w-full max-w-36"
              />
            ))}
          </div>
          <button
            type="button"
            className="btn btn-sm border-none bg-[#12392f] px-6 text-white hover:bg-[#0d2b24]"
          >
            See All Books
          </button>
        </div>
      </div>
    </section>
  );
}
