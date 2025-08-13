
import React from 'react'
import MyBlog from './components/MyBlog'
import { headers } from 'next/headers'

export default async function MyBookings() {
    const result=await fetch('http://localhost:3000/api/blogs',
      {
        headers:headers()
      }
    )
    const data=await result.json()
    
    console.log(data)
   
  return (
    <div className='max-w-7xl mx-auto'>
     <h2 className="text-4xl font-semibold mb-4 text-center my-20">Create Blog Post</h2>
        <div className="overflow-x-auto ">
  <table className="table border-3 border-[#318892]  rounded-lg shadow-md mt-10">
    
    <thead>
      <tr className='text-[#318892] text-lg '>
        <th>
         Sl No
        </th>
        <th>Title</th>
        <th>Tags</th>
        <th>Likes</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((dat,index)=><MyBlog dat={dat} index={index} key={dat._id}></MyBlog>)}
      
      </tbody>
    
  </table>
</div>
    </div>
  )
}
