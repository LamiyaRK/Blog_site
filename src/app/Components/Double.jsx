import dbConnect from '@/lib/dbConnect'
import Image from 'next/image'
import React from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'
import { FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import FeatureCardSamll from './FeatureCardSamll';
import FeatureCardBig from './FeatureCardBig';
export default async function Double() {
    const blogcol=dbConnect("blogs")
    const data=await blogcol.find({}).sort({likes:-1}).limit(7).toArray()
    const [data1,...data2]=data
    
  return (
    <div className='relative max-w-7xl w-5/6 mx-auto'>
    <div className='text-center'>
      <p className="text-sm text-[#08528b] "><i className="text-gray-400 mr-2">in</i>{data1.category}</p>
      <h2 className="text-5xl  font-bold mt-4 my-4">{data1.title}</h2>
      <p className="text-sm mb-10"><span className="text-gray-400 mr-2 ">{data1.date} -</span>5 comments</p>
           <Image
                    src={data1.image}
                    alt={data1.title}
                    height={570}
                    width={1000}
                    className="w-full h-[570px] object-cover object-center"
                  />
          
          <p className="mt-4  text-start text-lg ">
            {data1.excerpt}
          </p>
          <div className=' border-t border-b mt-10 flex justify-between border-gray-200 mb-5'>
          <p className='text-gray-500  py-3 '><i>By </i><span className='text-black font-semibold ml-2'> 

          {data1.writer}</span></p>
          <div className='flex gap-3 items-center '><div className='flex items-center gap-2'><IoIosHeartEmpty size={20}/>{data1.likes}</div> |
          <FaFacebookF />
          <FaXTwitter />
          <FaPinterestP />
          <CiMail size={20}/>
          </div>
          
          </div>
          </div>
         <div className='grid grid-cols-2 grid-rows-8 gap-10'>
            {data2.map((dat,index)=>{
                if(index==0||index==3||index==4)
                {
                   return <div key={dat._id} className='row-span-2'><FeatureCardSamll dat={dat} ></FeatureCardSamll></div>
                }
                else
                {
                    return <div key={dat._id} className='row-span-3'><FeatureCardBig dat={dat} ></FeatureCardBig></div>
                }
            })}
         </div>
    </div>
  )
}
