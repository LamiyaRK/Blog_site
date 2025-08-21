INKSphere 🖋️

A full-stack blog platform built with Next.js (App Router) with authentication, premium content, and interactive features.

Features

Authentication: Google, Email, GitHub (NextAuth)

Landing & Public Pages: Home, About, Contact, Blog

Dashboard: Protected CRUD for posts (create, edit, delete, view)

Posts: Like, comment, premium posts

Payment: Dummy payment simulation for premium posts

Dynamic Routes: /post/[slug] for detailed posts

Styling & UX: Tailwind CSS, next/image, next/font, responsive design

Data Fetching: Server API routes 
Tech Stack

Next.js (App Router), React, Tailwind CSS, NextAuth.js, MongoDB

Setup Instructions

Clone repo: git clone https://github.com/LamiyaRK/Blog_site

Install dependencies: npm install

Add .env.local with NextAuth, Google/GitHub creds, MongoDB URI

Run: npm run dev

Open http://localhost:3000

Live Demo

[\[Live Link\]](https://blog-site-sigma-puce.vercel.app/)