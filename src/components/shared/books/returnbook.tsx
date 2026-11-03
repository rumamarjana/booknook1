"use client";

import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type ReturnBookProps = {
  id: string;
};

const ReturnBook = ({ id }: ReturnBookProps) => {
  const router = useRouter();

  const handleReturn = async () => {
    try {
      const session = await authClient.getSession();

      const token = session.data?.session?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        toast.success("Book returned successfully!");
        router.refresh();
      } else {
        toast.error("Failed to return book!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <button onClick={handleReturn}>
      Return Book
    </button>
  );
};

export default ReturnBook;