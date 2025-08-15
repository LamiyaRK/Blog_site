
import React from 'react'
import MyBlog from './components/MyBlog'
import { headers } from 'next/headers'
export const dynamic = 'force-dynamic';
export default async function MyBookings() {
    const result=await fetch('https://blog-site-sigma-puce.vercel.app/api/blogs',
      {
        headers:await headers()
       
      }
    )
    const data=await result.json()
    
  
   
  return (
    <div className='max-w-7xl w-5/6 mx-auto'>
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
