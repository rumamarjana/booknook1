
import Banner from "@/components/homepage/Banner";
import NewArrivals from "@/components/homepage/NewArrivals";
import HowBorrowingWorks from "@/components/homepage/HowBorrowingWorks";
import ReaderReviews from "@/components/homepage/ReaderReviews";


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
