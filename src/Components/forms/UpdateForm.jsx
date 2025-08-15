"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
export const dynamic = "force-dynamic";
export default function UpdateForm({ blogdata }) {
    const router=useRouter()
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    date: "",
    image: "",
    excerpt: "",
    content: "",
    tags: "",
    likes: 0,
    isPremium: false,
  });

  // Prefill the form when blogdata is loaded
  useEffect(() => {
    if (blogdata) {
      setFormData({
        title: blogdata.title || "",
        slug: blogdata.slug || "",
        category: blogdata.category || "",
        date: blogdata.date ? blogdata.date.split("T")[0] : "",
        image: blogdata.image || "",
        excerpt: blogdata.excerpt || "",
        content: blogdata.content || "",
        tags: blogdata.tags ? blogdata.tags.join(", ") : "",
        likes: blogdata.likes || 0,
        isPremium: blogdata.isPremium || false,
      });
    }
  }, [blogdata]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      writer: session?.user?.name,
      email: session?.user?.email,
      tags: tagsArray,
    };

    try {
      const response = await fetch(`https://blog-site-sigma-puce.vercel.app/api/service/${blogdata._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
    

      if (result.modifiedCount > 0) {
        toast.success("Blog Updated Successfully!");
        router.push('/myBlogs')
      } else {
        toast.error("No changes detected or update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating blog.");
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-4 text-center my-20">
        Update Blog Post
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-7xl w-5/6 mx-auto p-10 border-3 border-[#318892] rounded-lg shadow-md space-y-6 my-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block mb-2 font-medium">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Writer */}
          <div>
            <label className="block mb-2 font-medium">Writer</label>
            <input
              type="text"
              value={session?.user?.name || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={session?.user?.email || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block mb-2 font-medium">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={5}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Is Premium */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isPremium"
            checked={formData.isPremium}
            onChange={handleChange}
            className="checkbox"
          />
          <label className="mb-0 font-medium">Is Premium?</label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#318892] text-white p-3 rounded mt-4"
        >
          Update Blog Post
        </button>
      </form>
    </div>
  );
}
