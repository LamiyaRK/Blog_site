import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DeleteButton from './DeleteButton'

export default async function MyBlog({dat,index}) {
    const {image,title,category,likes,date,tags}=dat
    
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
                  src={image}
                  width={500}
                  height={500}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{title}</div>
              <div className="text-sm opacity-50">{category}</div>
            </div>
          </div>
        </td>
        <td>
         {tags.map((tag,index)=><span key={index}>{tag}, </span>)}
          <br />
          <span className="badge badge-ghost badge-sm">{date}</span>
        </td>
        <td>{likes}</td>
        <th className='flex items-center gap-2 '>
        <Link href={`/blogs/${dat._id}`}><button className="btn btn-info text-white btn-sm">Details</button></Link>
          <DeleteButton delid={dat._id}/>
       <Link href={`/updateBlog/${dat._id}`}><button className="btn btn-accent text-white btn-sm ">Edit</button></Link>
        </th>
      </tr>
  )
}
