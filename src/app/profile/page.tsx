import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | My Profile",
};

export default function MyProfilePage() {
  return (
    <main className="flex flex-1 flex-col items-center bg-[#fdfbf5] py-10">
      <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
    </main>
  );
}
