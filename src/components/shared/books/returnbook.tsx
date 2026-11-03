import React from 'react';

const returnbook = () => {
    const handleReturn = async (id) => {
        const res = await fetch(
            `http://localhost:8000/my-borrows/return/${id}`,
            {
                method: "PATCH",
            }
        );

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message);
            router.refresh();
        } else {
            toast.error(data.message);
        }
    };
    return (
        <button
            onClick={() => handleReturn(borrow._id)}
            disabled={borrow.status === "returned"}
            className="btn btn-success btn-sm"
        >
            {borrow.status === "returned" ? "Returned" : "Return Book"}
        </button>
    );
};

export default returnbook;