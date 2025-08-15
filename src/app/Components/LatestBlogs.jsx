import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
export const dynamic = "force-dynamic";
export default async function LatestBlogs() {
    const res=await fetch('https://blog-site-sigma-puce.vercel.app/api/latest')
const data=await res.json()
  return (
    <div>
    <h1 className='text-center font-bold text-2xl mb-4 my-20'>Latest Blogs</h1>
    <div className="grid grid-cols-1  w-full   border border-gray-200 py-2">
      {data.map((dat) => (
      <Link href={`/blogs/${dat._id}` } key={dat._id}>  <div   className=" py-2 px-4 rounded-lg ">
          <div className="flex gap-5 items-center">
           
            <div
              style={{ width: 124, height: 103 }}
              className="flex-shrink-0 overflow-hidden rounded"
            >
              <Image
                src={dat.image}
                width={124}
                height={103}
                alt={dat.title}
                className="object-cover object-center w-full h-full"
              />
            </div>

            
            <div className="flex-1">
              <p className="text-lg font-medium leading-tight">{dat.title}</p>
              <p className="text-gray-500 pt-3 font-medium">{dat.date}</p>
            </div>
          </div>
        </div></Link>
      ))}
    </div>
    </div>
  )
}
