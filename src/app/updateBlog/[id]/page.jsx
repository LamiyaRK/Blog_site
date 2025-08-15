import UpdateForm from '@/Components/forms/UpdateForm';
import React from 'react'
export const dynamic = "force-dynamic";
export default async function UpdateBlog({params}) {
    const p=await params;
    const res=await fetch(`https://blog-site-sigma-puce.vercel.app/api/service/${p.id}`)
     const blogdata=await res.json()

  return (
    <div>
        <UpdateForm blogdata={blogdata} key={blogdata._id}></UpdateForm>
    </div>
  )
}
