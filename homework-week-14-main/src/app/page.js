import BookList from "@/components/BookList";
import prisma from "@/lib/prisma";

async function getData() {
  try {
    const data = await prisma.book.findMany();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const data = await getData();
  return (
    <>
      <BookList books={data} />
    </>
  );
}
