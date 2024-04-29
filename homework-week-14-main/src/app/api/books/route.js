import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const response = await prisma.book.findMany();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: "internal server error" });
  }
}

export async function POST(req, { params }) {
  try {
    const { title, author, publisher, year, pages } = await req.json();
    if (!title || !author || !publisher || !year || !pages)
      throw { name: "invalidbook" };
    await prisma.book.create({
      data: {
        title: title,
        author: author,
        publisher: publisher,
        year: +year,
        pages: +pages,
      },
    });
    return NextResponse.json({ message: "Add book success" });
  } catch (error) {
    if (error.name === "invalidbook") {
      return NextResponse.json({ message: "Input is invalid" });
    } else {
      return NextResponse.json({ message: "Internal Server Error" });
    }
  }
}
