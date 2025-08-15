import dbConnect from '@/lib/dbConnect'
import React from 'react'
import BlogCarousel from './BlogCarousel'

export default async function Popular() {
    const blogcol=dbConnect("blogs")
    const blogss=await blogcol.find({}).sort({likes:-1}).limit(6).toArray()
    const blogs = blogss.map(blog => ({
    ...blog,
    _id: blog._id.toString()
  }))
  return (
    <div className='my-20 max-w-7xl w-5/6 mx-auto'>
        <h1 className='text-center font-bold text-2xl mb-4'>Most Popular</h1>
        <BlogCarousel blogs={blogs}></BlogCarousel>
    </div>
  )
}
