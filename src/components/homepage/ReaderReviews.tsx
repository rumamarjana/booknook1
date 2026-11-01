import Image from "next/image";

const reviews = [
  {
    name: "Amana Kou",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "This service removed all the friction of borrowing. I can freely browse between libraries and my membership covers everything — no paperwork, ever.",
  },
  {
    name: "Xiafisolat",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    quote:
      "The curated collection is simply the best of the new technology, personal and warm. It makes coming home to my reader a joy every single time.",
  },
  {
    name: "Aun Bee",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "The overdue reminders are so clean and calm that I've never missed a due date. The credits and perks make it more than worth keeping to schedule.",
  },
];

function KebabIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  );
}

export default function ReaderReviews() {
  return (
    <section className="bg-[#f4f5f3] py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-xl font-bold text-slate-900">
          Reader Reviews
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map(({ name, avatar, quote }) => (
            <figure key={name} className="relative rounded-xl bg-white p-5 shadow-sm">
              <button
                type="button"
                aria-label={`Options for review by ${name}`}
                className="btn btn-circle btn-ghost btn-xs absolute right-2 top-2 text-slate-400"
              >
                <KebabIcon />
              </button>
              <figcaption className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 overflow-hidden rounded-full">
                    <Image
                      src={avatar}
                      alt={`Avatar of ${name}`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {name}
                </span>
              </figcaption>
              <div
                className="rating rating-sm mt-3"
                aria-label="Rated 5 out of 5 stars"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="mask mask-star-2 bg-amber-400" />
                ))}
              </div>
              <blockquote className="mt-2 text-sm italic leading-relaxed text-slate-500">
                “{quote}”
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
