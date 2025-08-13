"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BlogContent from "./BlogContent";

export default function UnlockFrom({ blog }) {
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState({
    date: "",
    cardNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false); // if user bought already

  // Check purchase status on mount
  useEffect(() => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }
    async function checkPurchase() {
      const res = await fetch(`/api/checkPurchase?blogid=${blog._id}&email=${session.user.email}`);
      const data = await res.json();
      setHasAccess(data.hasAccess);
      setLoading(false);
    }
    checkPurchase();
  }, [session, blog._id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: session.user.name,
      email: session.user.email,
      date: formData.date,
      cardNumber: formData.cardNumber,
      blogid: blog._id,
      blogtitle: blog.title,
      writer: blog.writer,
      blogimage: blog.image,
    };

    const response = await fetch("/api/service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (result.acknowledged) {
      toast.success("Blog Unlocked!");
      setHasAccess(true); // hide modal and show full content
    } else {
      toast.error("Failed to unlock blog. Try again.");
    }
  };

  if (loading) {
    // Optional: Show loading spinner or nothing
    return null;
  }

  if (hasAccess) {
    // User already bought or just unlocked: show full blog content
    return null;
  }

  // Not purchased yet, show modal

  if (!session?.user?.email) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full text-center">
          <p className="text-lg text-[#318892] font-semibold mb-2">It's Premium Content</p>
          <h2 className="text-2xl font-bold mb-4">
            Please Login and Unlock the Premium Content to Continue
          </h2>
          <Link href="/login">
            <button className="w-full bg-[#318892] text-white py-2 rounded-lg hover:bg-[#1b717a]">
              Login
            </button>
          </Link>
          <button
            type="button"
            className="w-full mt-3 border border-gray-400 py-2 rounded-lg hover:bg-gray-100"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Unlock Premium Content</h2>
        <p className="mb-6 text-gray-600 text-center">
          Fill in your details to purchase this premium article for $5
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={session.user.name}
              readOnly
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={session.user.email}
              readOnly
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Purchase Date</label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              required
              maxLength="16"
              value={formData.cardNumber}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#318892] text-white py-2 rounded-lg hover:bg-[#1b717a]"
          >
            Pay Now
          </button>

          <button
            type="button"
            className="w-full mt-3 border border-gray-400 py-2 rounded-lg hover:bg-gray-100"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
