/* Flat illustrative icons matching the "How Borrowing Works" mock (green box,
   request clipboard, open book, return clock). */

function IconDiscoverBooks() {
  return (
    <svg viewBox="0 0 100 76" className="mx-auto h-24 w-28" aria-hidden="true">
      <ellipse cx="50" cy="70" rx="30" ry="4" fill="#e5e7eb" />
      <rect x="30" y="16" width="9" height="26" rx="2" fill="#f59e0b" transform="rotate(-10 34.5 29)" />
      <rect x="43" y="12" width="9" height="27" rx="2" fill="#38bdf8" transform="rotate(6 47.5 25)" />
      <rect x="22" y="34" width="56" height="32" rx="5" fill="#10b981" />
      <rect x="22" y="34" width="56" height="10" rx="5" fill="#059669" />
      <path
        d="M56 34c4-7 9-8 13-8s9 1 13 8v5c-4-4-9-5-13-5s-9 1-13 5z"
        fill="#ffffff"
        stroke="#12392f"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconRequestBorrow() {
  return (
    <svg viewBox="0 0 100 76" className="mx-auto h-24 w-28" aria-hidden="true">
      <ellipse cx="50" cy="70" rx="28" ry="4" fill="#e5e7eb" />
      <rect x="16" y="26" width="20" height="20" fill="#10b981" />
      <rect x="36" y="26" width="20" height="20" fill="#d1fae5" />
      <rect x="56" y="26" width="20" height="20" fill="#10b981" />
      <rect x="16" y="46" width="20" height="20" fill="#d1fae5" />
      <rect x="36" y="46" width="20" height="20" fill="#10b981" />
      <rect x="56" y="46" width="20" height="20" fill="#d1fae5" />
      <rect x="46" y="18" width="32" height="42" rx="4" fill="#ffffff" stroke="#12392f" strokeWidth="2" />
      <rect x="56" y="14" width="12" height="9" rx="2" fill="#12392f" />
      <rect x="52" y="30" width="20" height="3.5" rx="1.75" fill="#10b981" />
      <rect x="52" y="38" width="20" height="3.5" rx="1.75" fill="#d1fae5" />
      <rect x="52" y="46" width="13" height="3.5" rx="1.75" fill="#d1fae5" />
    </svg>
  );
}

function IconEnjoyReading() {
  return (
    <svg viewBox="0 0 100 76" className="mx-auto h-24 w-28" aria-hidden="true">
      <ellipse cx="50" cy="70" rx="30" ry="4" fill="#e5e7eb" />
      <path d="M50 56C42 44 30 41 20 43V15c10-2 22 1 30 13Z" fill="#ffffff" stroke="#12392f" strokeWidth="2" />
      <path d="M50 56c8-12 20-15 30-13V15c-10-2-22 1-30 13Z" fill="#ffffff" stroke="#12392f" strokeWidth="2" />
      <rect x="28" y="24" width="13" height="3" rx="1.5" fill="#d1fae5" />
      <rect x="28" y="31" width="13" height="3" rx="1.5" fill="#d1fae5" />
      <rect x="59" y="24" width="13" height="3" rx="1.5" fill="#38bdf8" />
      <rect x="59" y="31" width="13" height="3" rx="1.5" fill="#38bdf8" />
      <path d="M50 34v11l3.5-3.5L57 45V34Z" fill="#f59e0b" />
    </svg>
  );
}

function IconReturnOnTime() {
  return (
    <svg viewBox="0 0 100 76" className="mx-auto h-24 w-28" aria-hidden="true">
      <ellipse cx="50" cy="70" rx="30" ry="4" fill="#e5e7eb" />
      <path
        d="M32 22A26 26 0 1 0 70 20"
        fill="none"
        stroke="#10b981"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M70 11v10l9-4Z" fill="#10b981" />
      <circle cx="50" cy="46" r="14" fill="#ffffff" stroke="#12392f" strokeWidth="2.5" />
      <path d="M50 46v-8M50 46l6 4" stroke="#12392f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="46" r="2" fill="#10b981" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 28 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hidden h-5 w-8 shrink-0 self-center text-slate-300 lg:block"
      aria-hidden="true"
    >
      <path d="M2 12h22M18 6l6 6-6 6" />
    </svg>
  );
}

const steps = [
  {
    num: 1,
    title: "Discover Books",
    Icon: IconDiscoverBooks,
    desc: "Explore the library's vast collection and borrow a variety of books.",
  },
  {
    num: 2,
    title: "Request Borrow",
    Icon: IconRequestBorrow,
    desc: "Choose a book and click “Request Borrow” to send your request.",
  },
  {
    num: 3,
    title: "Enjoy Reading",
    Icon: IconEnjoyReading,
    desc: "Receive your book and start reading — pick it up or switch to digital.",
  },
  {
    num: 4,
    title: "Return on Time",
    Icon: IconReturnOnTime,
    desc: "After your return period ends, settle it and keep your borrowing clean.",
  },
];

export default function HowBorrowingWorks() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-xl font-bold text-slate-900">
          How Borrowing Works
        </h2>
        <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-5">
          {steps.map(({ num, title, desc, Icon }, i) => (
            <div key={num} className="contents lg:flex lg:items-stretch lg:gap-5">
              {i > 0 && <ArrowIcon />}
              <div className="flex w-60 flex-col items-center text-center">
                <Icon />
                <h3 className="mt-3 text-sm font-bold text-slate-900">
                  {num}. {title}
                </h3>
                <p className="mt-1.5 w-48 text-left text-xs leading-relaxed text-slate-500">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
