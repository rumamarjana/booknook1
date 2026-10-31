import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import NewArrivals from "@/components/NewArrivals";
import HowBorrowingWorks from "@/components/HowBorrowingWorks";
import ReaderReviews from "@/components/ReaderReviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <Banner />
        <NewArrivals />
        <HowBorrowingWorks />
        <ReaderReviews />
      </main>
      <Footer />
    </>
  );
}
