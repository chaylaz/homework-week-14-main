import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const response = await prisma.book.findUnique({
      where: {
        id: +id,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: "internal server error" });
  }
}

export async function PUT(req, { params }) {
  try {
    const { title, author, publisher, year, pages } = await req.json();
    const response = await params;
    if (!title && !author && !publisher && !pages && !year)
      throw { name: "invalidinput" };
    await prisma.book.update({
      where: {
        id: +response.id,
      },
      data: {
        title: title,
        author: author,
        publisher: publisher,
        year: +year,
        pages: +pages,
      },
    });
    return NextResponse.json({ message: "Update book success" });
  } catch (error) {
    if (error.name === "invalidinput") {
      return NextResponse.json({ message: "Input is invalid" });
    } else {
      console.log(error.message);
      return NextResponse.json({ message: "Internal Server Error" });
    }
  }
}

export async function DELETE(req, { params }) {
  try {
    const response = await params;
    await prisma.book.delete({
      where: {
        id: +response.id,
      },
    });
    return NextResponse.json({ message: "Delete book success" });
  } catch (error) {
    if (error.name === "invalidparams") {
      return NextResponse.json({ message: "Params is invalid" });
    } else {
      console.log(error.message);
      return NextResponse.json({ message: "Internal Server Error" });
    }
  }
}
