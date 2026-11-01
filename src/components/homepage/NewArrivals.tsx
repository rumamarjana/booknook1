import BookCard from "@/components/shared/BookCard";
import { animate} from "motion"
import Link from "next/link";

const books = [
  {
    title: "Discover Books",
    author: "by Kelech",
    badge: "Fiction",
    cover: "https://picsum.photos/seed/booknook-new-1/300/420",
  },
  {
    title: "Tech Anjule",
    author: "by Arthur Notsion",
    badge: "Technology",
    cover: "https://picsum.photos/seed/booknook-new-2/300/420",
  },
  {
    title: "Book 1 Dastw",
    author: "by Jean Saarkison",
    badge: "Self-help",
    cover: "https://picsum.photos/seed/booknook-new-3/300/420",
  },
  {
    title: "Vilach Books",
    author: "by Aython Robas",
    badge: "Fantasy",
    cover: "https://picsum.photos/seed/booknook-new-4/300/420",
  },
  {
    title: "Return on Time",
    author: "by Bear Roas",
    badge: "Motivational",
    cover: "https://picsum.photos/seed/booknook-new-5/300/420",
  },
];

export default function NewArrivals() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-xl font-bold text-slate-900">New Arrivals</h2>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {books.map(({ title, author, badge, cover }) => (
            <BookCard
              key={title}
              title={title}
              author={author}
              badge={badge}
              cover={cover}
            />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href={'/books'}
            type="button"
            className="btn btn-sm border-none bg-[#12392f] px-6 text-white hover:bg-[#0d2b24]"
          >
            See All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
