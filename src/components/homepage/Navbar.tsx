import Image from "next/image";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "All Books", href: "/books", active: false },
  { label: "Add Book", href: "/add-book", active: false },
  { label: "My Books", href: "/my-books", active: false },
  { label: "My Borrows", href: "/my-borrows", active: false },
];

function BookLogo() {
  return (
    <svg viewBox="0 0 48 48" className="size-9" aria-hidden="true">
      <path d="M24 12c-5-4-11-5.5-17-4.5v27c6-1 12 .5 17 4.5V12Z" fill="#16382f" />
      <path d="M24 12c5-4 11-5.5 17-4.5v27c-6-1-12 .5-17 4.5V12Z" fill="#2e8b6a" />
      <path d="m24 6 4.5 5-4.5 5-4.5-5L24 6Z" fill="#f59e0b" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      <path d="M4.5 20.25a8.25 8.25 0 0 1 15 0" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15" />
      <path d="m12 9 3 3m0 0-3 3m3-3H3.75" />
    </svg>
  );
}

export default function Navbar() {
  // Flip this to true (once real login/session state exists) to show the
  // avatar + profile dropdown instead of the Login / Signup links.
  const isLoggedIn = false;

  return (
    <header className="relative z-20 bg-white">
      <nav className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <a href="/" className="flex items-center gap-2">
            <BookLogo />
            <span className="font-serif text-2xl font-bold text-slate-900">
              BookNook
            </span>
          </a>
        </div>

        <div className="navbar-center hidden md:block">
          <ul className="menu menu-horizontal gap-1 px-1">
            {links.map(({ label, href, active }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`rounded-none border-b-2 pb-1 ${
                    active
                      ? "border-emerald-600 font-semibold text-emerald-700"
                      : "border-transparent font-medium text-slate-700 hover:text-emerald-700"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          {isLoggedIn ? (
            <details className="dropdown dropdown-end">
              <summary className="btn btn-circle btn-ghost list-none [&::-webkit-details-marker]:hidden">
                <div className="avatar">
                  <div className="w-10 overflow-hidden rounded-full ring-1 ring-slate-200">
                    <Image
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
              </summary>
              <ul className="menu dropdown-content z-50 mt-2 w-44 rounded-box bg-white p-2 text-slate-700 shadow-md">
                <li>
                  <a href="/profile" className="gap-2">
                    <UserIcon /> My Profile
                  </a>
                </li>
                <li>
                  <a href="/logout" className="gap-2">
                    <LogoutIcon /> Logout
                  </a>
                </li>
              </ul>
            </details>
          ) : (
            // Logged out: plain navbar links, no dropdown
            <div className="flex items-center gap-2">
              <a
                href="/login"
                className="btn btn-ghost btn-sm gap-2 text-slate-700 hover:bg-slate-100 hover:text-emerald-700"
              >
                <UserIcon />
                Login
              </a>
              <a
                href="/signup"
                className="btn btn-sm gap-2 border-none bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Signup
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
