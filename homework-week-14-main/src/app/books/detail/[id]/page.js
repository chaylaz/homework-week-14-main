"use client";
import { useParams } from "next/navigation";

export default function BookDetail() {
  const params = useParams();
  async function showDetail() {
    const { id } = params;
    const data = await bookDetail(+id);
    return data;
  }
  return <>{console.log(showDetail)}</>;
}
