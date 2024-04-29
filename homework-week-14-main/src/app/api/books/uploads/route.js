import BASE_IMAGE_URL from "@/lib/baseImage";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const formData = await req.formData();
    const file = formData.getAll("image")[0];
    const imagePath = await uploadFile(file, "/images");
    const imageUrl = `${BASE_IMAGE_URL}/${imagePath}`;
    return NextResponse.json(
      { message: "Upload success", image_url: imageUrl },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
