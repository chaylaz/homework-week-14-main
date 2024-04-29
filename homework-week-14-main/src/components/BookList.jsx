"use client";

import Button from "@/components/ui/Button";
import { deleteBook } from "@/services/books";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookList({ books }) {
  const router = useRouter();
  async function handleDelete(id) {
    await deleteBook(id);
    router.refresh();
  }
  return (
    <div className="relative overflow-x-auto">

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Author
            </th>
            <th scope="col" className="px-6 py-3">
              Publisher
            </th>
            <th scope="col" className="px-6 py-3">
              Year
            </th>
            <th scope="col" className="px-6 py-3">
              Pages
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => {
            return (
              <tr
                key={idx}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{idx + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.year}</td>
                <td>{book.pages}</td>
                <td>
                  <a href={book.image}>{book.image}</a>
                </td>
                <td>
                  <Button
                    type="button"
                    onClick={(e) => handleDelete(book.id)}
                    className="bg-red-600 w-full rounded my-3"
                  >
                    Delete
                  </Button>{" "}
                  <Link href={`/books/${book.id}`}>
                    <Button
                      type="button"
                      className="bg-blue-600 w-full rounded my-3"
                    >
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link href={"/books"}>
        <Button className="bg-green-600 w-full rounded my-3">Add Book</Button>
      </Link>
    </div>
  );
}
