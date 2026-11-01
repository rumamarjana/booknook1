import { Suspense } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function BookDetails({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:8000/books/${id}`
  );

  if (!res.ok) {
    return <h1>Book not found!</h1>;
  }

  const data = await res.json();
  console.log(data)
  return (
    <div>
      <h1>{data.title}</h1>
      
      <h2>{data.author}</h2>
      <p>{data.category}</p>
      <p>{data.description}</p>
    </div>
  );
}

export default function BookDetailsPage({ params }: Props) {
  return (
    <Suspense fallback={<p>Loading book details...</p>}>
      <BookDetails params={params} />
    </Suspense>
  );
}