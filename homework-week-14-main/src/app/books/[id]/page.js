"use client";

import { useState } from "react";
import { updateBook } from "@/services/books";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function UpdateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const router = useRouter();
  const params = useParams();

  async function handleSubmit() {
    const { id } = params;
    await updateBook(+id, {
      title,
      author,
      publisher,
      year,
      pages,
    });
    router.push("/");
    router.refresh("/");
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-2 text-blue-600">Edit Book</h1>
      </div>
      <div>
        <Input
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter Author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter Publisher"
          onChange={(e) => setPublisher(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Enter Year"
          onChange={(e) => setYear(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Enter Pages"
          onChange={(e) => setPages(e.target.value)}
        />
        <Button
          className="bg-green-600 w-full rounded my-3"
          onClick={handleSubmit}
        >
          Update
        </Button>{" "}
        <Link href={"/"}>
          <Button className="bg-red-600 w-full rounded my-3">Cancel</Button>
        </Link>
      </div>
    </>
  );
}
