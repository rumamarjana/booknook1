
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/app/lib/auth-client";


const links = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

function BookLogo() {
  return (
    <svg viewBox="0 0 48 48" className="size-9" aria-hidden="true">
      <path
        d="M24 12c-5-4-11-5.5-17-4.5v27c6-1 12 .5 17 4.5V12Z"
        fill="#16382f"
      />
      <path
        d="M24 12c5-4 11-5.5 17-4.5v27c-6-1-12 .5-17 4.5V12Z"
        fill="#2e8b6a"
      />
      <path d="m24 6 4.5 5-4.5 5-4.5-5L24 6Z" fill="#f59e0b" />
    </svg>
  );
}

export default function Navbar() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logout successful!");
    router.push("/login");
    router.refresh();
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="navbar mx-auto max-w-7xl px-4">

        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <BookLogo />
            <span className="font-serif text-2xl font-bold text-slate-900">
              BookNook
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-center hidden md:block">
          <ul className="menu menu-horizontal gap-1 px-1">
            {links
              .filter(({ label }) =>
                isLoggedIn ||
                !["Add Book", "My Books", "My Borrows"].includes(label)
              )
              .map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-medium text-slate-700 hover:text-emerald-700"
                  >
                    {label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Account Section */}
        <div className="navbar-end">

          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              {/* DaisyUI Avatar */}
              <div
                tabIndex={0}
                role="button"
                className="avatar cursor-pointer"
              >
                <div className="w-10 rounded-full ring-2 ring-emerald-600 ring-offset-2">
                  <Image
                    src={
                      user?.image ||
                      "https://i.pravatar.cc/150?img=44"
                    }
                      width={40}
                      height={40}
                    alt={user?.name || "User"}
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-56 rounded-box bg-white p-3 shadow-lg"
              >
                <li className="menu-title">
                  <span>{user?.name}</span>
                  <span className="text-xs font-normal">
                    {user?.email}
                  </span>
                </li>

                <li>
                  <Link href="/profile">My Profile</Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="btn btn-ghost btn-sm"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="btn btn-sm border-none bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      </nav>
    </header>
  );
}

