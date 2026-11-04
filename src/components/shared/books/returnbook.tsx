"use client";

import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type ReturnBookProps = {
  id: string;
};

const ReturnBook = ({ id }: ReturnBookProps) => {
  const router = useRouter();

 const handleReturn = async (id: string) => {
    if (returningId) return;

    try {
        setReturningId(id);

        const { data, error } = await authClient.token();

        if (error || !data?.token) {
            throw new Error("Authentication token not found!");
        }

        const res = await fetch(`${API_URL}/borrows/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${data.token}`,
            },
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || "Return failed");
        }

        setBorrows((prev) =>
            prev.map((item) =>
                item._id === id
                    ? {
                          ...item,
                          status: "returned",
                          returnDate: new Date().toISOString(),
                      }
                    : item
            )
        );

        toast.success("Book returned successfully!");

    } catch (error) {
        console.error("Return Error:", error);

        toast.error(
            error instanceof Error
                ? error.message
                : "Failed to return book!"
        );

    } finally {
        setReturningId(null);
    }
};

  return (
    <button onClick={handleReturn}>
      Return Book
    </button>
  );
};

export default ReturnBook;