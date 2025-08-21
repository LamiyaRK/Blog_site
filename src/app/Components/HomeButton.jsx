"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

export default function HomeButton() {
     const router = useRouter();
  return (
     <button
        className="btn absolute top-10 left-10 btn-xl "
        onClick={() => router.push("/")} // Go back to home
      >
        Go Back To Home
      </button>
  )
}
