function FooterLogo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <svg viewBox="0 0 48 48" className="size-9" aria-hidden="true">
        <path d="M24 12c-5-4-11-5.5-17-4.5v27c6-1 12 .5 17 4.5V12Z" fill="#d97706" />
        <path d="M24 12c5-4 11-5.5 17-4.5v27c-6-1-12 .5-17 4.5V12Z" fill="#f59e0b" />
        <path d="m24 6 4.5 5-4.5 5-4.5-5L24 6Z" fill="#fffbeb" />
      </svg>
      <span className="font-serif text-2xl font-bold text-white">
        BookNook
      </span>
    </a>
  );
}

function AtSignIcon() {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  );
}

function MailIcon() {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function PhoneIcon() {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MapPinIcon() {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M13 10h3l-.5 3H13v9h-3v-9H8v-3h2V8.5C10 6 11.5 4 14.5 4H16v3h-1.5c-1 0-1.5.5-1.5 1.5V10Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.7 11.7 0 0 1 3.4 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.6.2-1.3.2-1.9.1a4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.7 11.7 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const brandEmails = [
  "aultborrow@booknook.com",
  "support@booknook.com",
  "hello@booknook.com",
];

export default function Footer() {
  return (
    <footer className="bg-[#12392f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3 md:items-start">
        <div>
          <FooterLogo />
          <ul className="mt-5 space-y-2.5 text-sm text-white/80">
            {brandEmails.map((email) => (
              <li key={email} className="flex items-center gap-2">
                <AtSignIcon />
                {email}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <MailIcon /> Mails: support@booknook.com
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon /> Phones: +123 45 6789 392 8383
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon /> Address: Boucha, Dhaka 1210
            </li>
          </ul>
        </div>

        <div className="flex gap-3 md:justify-self-end">
          <a href="https://facebook.com" aria-label="BookNook on Facebook" className="text-white/90 hover:text-emerald-300">
            <FacebookIcon />
          </a>
          <a href="https://twitter.com" aria-label="BookNook on Twitter" className="text-white/90 hover:text-emerald-300">
            <TwitterIcon />
          </a>
          <a href="https://instagram.com" aria-label="BookNook on Instagram" className="text-white/90 hover:text-emerald-300">
            <InstagramIcon />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/70">
        Copyright © BookNook. All rights reserved.
      </div>
    </footer>
  );
}
