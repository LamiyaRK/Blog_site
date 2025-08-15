import React from 'react'
import LatestBlogs from './LatestBlogs'
import Image from 'next/image'
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
export const dynamic = "force-dynamic";
export default async function SideHome() {
  const pics=[
    {
      id:101,
      pic:'/assets/insta-file-1621255444.webp'
    },
    {
      id:102,
      pic:'/assets/insta-file-1621255450.webp'
    },
    {
      id:103,
      pic:'/assets/insta-file-1621255456.8295102022.webp'
    },
    {
      id:104,
      pic:'/assets/insta-file-1621255463.webp'
    },
    {
      id:105,
      pic:'/assets/insta-file-1621255473.3093308617.webp'
    },
    {
      id:106,
      pic:'/assets/sincerely-media-ylveRpZ8L1s-unsplash.webp'
    },
  ]
    const res=await fetch('https://blog-site-sigma-puce.vercel.app/api/categories')
const data=await res.json()
  return (
    <div>
    <Image
        src={'https://i.ibb.co.com/99WY54h2/morgane-le-breton-rq-Ir5y-FIa-Gc-unsplash.jpg'}
        height={500}
        width={500}
        alt='garden'
        className='object-cover h-[500px] object-center'
    />
    <h1 className='text-center font-bold text-2xl mb-4 my-20'>About</h1>
     <div className='p-6 border border-gray-200 '>
        
        <Image
        src={'https://i.ibb.co.com/vCHRqFPC/kyle-loftus-32iq-GBun-A-U-unsplash.webp'}
        height={500}
        width={500}
        alt='man'
        className='object-cover h-[300px] object-center'
    />
    <p className='text-center pt-5'><span className='font-semibold'>James Patel</span> is the founder and editor of his personal blog, where he shares insights, tips, and stories about technology, lifestyle, and creative projects.</p>
     </div>
    
        <LatestBlogs></LatestBlogs>
        <div className='flex flex-col items-center justify-center p-6 my-20 bg-gray-100'>
         <h1 className='text-center font-bold text-2xl  mb-3  '>Newsletter</h1>
         <p className='w-[25px] border-b border-2 mx-auto'></p>
         <p className='mt-6 text-center'>Subscribe to our newsletter for exclusive content and all of the behind the scenes details.</p>
         <div className='w-full'>
         <input type='email' className='input mt-4 w-full' placeholder='Your email address..'/>
         <button className='btn btn-neutral mt-4 w-full '>Subscribe</button>
         </div>
        </div>
        <h1 className='text-center font-bold text-2xl  mt-20  '>Instagram</h1>
        <div className="grid grid-cols-3 gap-4 mt-10 mb-20">
  {pics.map(pi => (
    <div key={pi.id}>
      <Image 
        src={pi.pic} 
        height={500} 
        width={500} 
        alt={`insta-${pi.id}`} 
        className='h-full w-full object-center object-cover'
      />
    </div>
  ))}
</div>
  <h1 className='text-center font-bold text-2xl  mt-20  '>Category</h1>
<div className='mt-10 border border-gray-200 p-6'>
 {
  data.map(dat=><div key={dat.category} className='flex justify-between p-6 border-b-3 border-gray-200'>
   <p className='flex items-center gap-2 '><RiCheckboxBlankCircleLine size={10} color='#318892' />{dat.category}</p> 
    <p>{dat.count}</p> 
  </div>)
 }
</div>

    </div>
  )
}
