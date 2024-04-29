"use client";

import { useState } from "react";
import { createBook, uploadImage } from "@/services/books";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    const data = await createBook({
      title,
      author,
      publisher,
      year,
      pages,
      image,
    });
    console.log(data);
    router.push("/");
    router.refresh("/");
  }

  async function handleImage(e) {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const response = await uploadImage(formData);
    if (response.image_url) {
      setImage(response.image_url);
    }
  }

  return (
    <>
      <div>
        <h1  className="text-3xl font-bold mb-2 text-blue-600">Add Book</h1>
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
        <Input
          type="file"
          placeholder="Enter Image"
          onChange={(e) => handleImage(e)}
        />
        <Button
          className="bg-blue-600 w-full rounded my-3"
          onClick={handleSubmit}
        >
          Create
        </Button>{" "}
        <Link href={"/"}>
          <Button className="bg-red-600 w-full rounded my-3">Cancel</Button>
        </Link>
      </div>
    </>
  );
}
