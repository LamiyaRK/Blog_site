import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function PremiumBlogs({dat,index}) {
    const {blogimage,blogtitle,writer,date}=dat
  return (
    <tr>
        <th>
          
            {index+1}
         
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image
                  src={blogimage}
                  width={500}
                  height={500}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{blogtitle}</div>
              
            </div>
          </div>
        </td>
        <td>
        
          <span className="badge badge-ghost badge-sm">{date}</span>
        </td>
        <td>{writer}</td>
        <th className='flex items-center gap-2 '>
        <Link href={`/blogs/${dat.blogid}`}><button className="btn btn-info text-white btn-sm">Details</button></Link>
         
        </th>
      </tr>
  )
}
