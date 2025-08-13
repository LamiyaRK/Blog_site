import UpdateForm from '@/Components/forms/UpdateForm';
import React from 'react'

export default async function UpdateBlog({params}) {
    const p=await params;
    const res=await fetch(`http://localhost:3000/api/service/${p.id}`)
     const blogdata=await res.json()

  return (
    <div>
        <UpdateForm blogdata={blogdata} key={blogdata._id}></UpdateForm>
    </div>
  )
}
