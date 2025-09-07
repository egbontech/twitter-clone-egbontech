"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function GoBackButton() {
    const router = useRouter();
  return (
    <button className="cursor-pointer"onClick={() => router.back()}>
      <FaArrowLeft size={20} />
    </button>
  );
}
