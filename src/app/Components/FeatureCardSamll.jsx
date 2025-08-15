import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'

export default function ({dat}) {
    
  return (
    <div>
      <div className='text-center lg:h-[750px] flex flex-col max-w-7xl'>
             
             <p className="text-sm mb-10"><span className="text-gray-400 mr-2 ">{dat.date} -</span>5 comments</p>
                  <Image
                           src={dat.image}
                           alt={dat.title}
                           height={500}
                           width={500}
                           className="w-full h-[300px] lg:h-[450px] object-cover object-center"
                         />
                 <p className="text-sm text-[#08528b] "><i className="text-gray-400 mr-2">in</i>{dat.category}</p>
             <h2 className="text-2xl  font-bold mt-4 my-4 flex-1">{dat.title}</h2>
                 <p className="mt-4  text-lg ">
                   {dat.excerpt}
                 </p>
                 
                 <Link href={`/blogs/${dat._id}`}><button className='btn btn-neutral mt-4 rounded-3xl px-7' >Read More</button></Link> 
                 </div>
    </div>
  )
}
