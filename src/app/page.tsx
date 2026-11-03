
import type { Metadata } from "next";
import Banner from "@/components/homepage/Banner";
import NewArrivals from "@/components/homepage/NewArrivals";
import HowBorrowingWorks from "@/components/homepage/HowBorrowingWorks";
import ReaderReviews from "@/components/homepage/ReaderReviews";

export const metadata: Metadata = {
  title: "BookNook | Home",
};

export default function Home() {
  return (
    <>
     
      <main className="flex flex-col flex-1">
        <Banner />
        <NewArrivals />
        <HowBorrowingWorks />
        <ReaderReviews />
      </main>
   
    </>
  );
}
