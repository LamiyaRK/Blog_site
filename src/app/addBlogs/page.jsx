"use client"
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
export const dynamic = "force-dynamic";
export default function BlogPostForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    id: "",
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
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
      likes: 0, // force likes to 0
    };

   const response = await fetch("https://blog-site-sigma-puce.vercel.app/api/blogs", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload),
       });
       const result = await response.json();
   
       if (result.acknowledged) {
         toast.success("Blog Posted Successfully!");
         
       } else {
         toast.error("Failed to post blog. Try again.");
       }
     
    // TODO: API call here
  };

  return (
    <div>
       <h2 className="text-4xl font-semibold mb-4 text-center my-20">Create Blog Post</h2>
    
    <form
      onSubmit={handleSubmit}
      className="max-w-7xl w-5/6 mx-auto p-10 border-3 border-[#318892]  rounded-lg shadow-md space-y-6 my-10"
    >
     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ID */}
        <div>
          <label htmlFor="id" className="block mb-2 font-medium">
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block mb-2 font-medium">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block mb-2 font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Writer */}
        <div>
          <label htmlFor="writer" className="block mb-2 font-medium">
            Writer
          </label>
          <input
            type="text"
            id="writer"
            name="writer"
           defaultValue={session?.user?.name}
              readOnly
           
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block mb-2 font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block mb-2 font-medium">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={session?.user?.email}
              readOnly
           
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block mb-2 font-medium">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={2}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block mb-2 font-medium">
          Content
        </label>
        <textarea
          id="content"
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
        <label htmlFor="tags" className="block mb-2 font-medium">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
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
          id="isPremium"
          name="isPremium"
          checked={formData.isPremium}
          onChange={handleChange}
          className="checkbox"
        />
        <label htmlFor="isPremium" className="mb-0 font-medium">
          Is Premium?
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-[#318892] text-white p-3 rounded mt-4"
      >
        Submit Blog Post
      </button>
    </form>
    </div>
  );
}
