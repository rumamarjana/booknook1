import Image from "next/image";

type BookCardProps = {
  title: string;
  author: string;
  cover: string;
  /** 0–5 stars; omit to hide the rating row */
  rating?: number;
  /** genre chip (e.g. "Fiction"); omit to hide */
  badge?: string;
  className?: string;
};

export default function BookCard({
  title,
  author,
  cover,
  rating,
  badge,
  className = "",
}: BookCardProps) {
  return (
    <div
      className={`rounded-xl bg-[#fdfbf5] p-3 text-slate-800 shadow-md ${className}`}
    >
      <Image
        src={cover}
        alt={`Cover of ${title}`}
        width={260}
        height={360}
        className="h-40 w-full rounded-md object-cover"
      />
      <h3 className="mt-2 truncate text-sm font-bold">{title}</h3>
      <p className="truncate text-xs text-slate-500">{author}</p>
      {badge !== undefined && (
        <span className="badge badge-sm mt-1 border-none bg-sky-100 text-sky-700">
          {badge}
        </span>
      )}
      {rating !== undefined && (
        <div
          className="rating rating-xs mt-1"
          aria-label={`${rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`mask mask-star-2 ${
                i < rating ? "bg-emerald-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      )}
      <button
        type="button"
        className="btn btn-xs mt-2 w-full border-slate-300 bg-white text-slate-700 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
      >
        View Details
      </button>
    </div>
  );
}
