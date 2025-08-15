import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import PremiumBlogs from './components/PremiumBlogs'
import { VscDiffAdded } from "react-icons/vsc";
import { FcPaid } from "react-icons/fc";
export const dynamic = "force-dynamic";
export default  async function UserActivityPage() {
  const res=await fetch('https://blog-site-sigma-puce.vercel.app/api/service',
    {
     headers: new Headers(await headers()),
    }
  )
  const data=await res.json()
  const res1=await fetch('https://blog-site-sigma-puce.vercel.app/api/blogs',
    {
     headers: new Headers(await headers()),
    }
  )
  const data1=await res1.json()
  

  return (
   <div className='max-w-7xl w-5/6 mx-auto'>
   <div className='grid md:grid-cols-2  gap-5 w-5/6 mx-auto my-20 '>
                                    <div className='flex p-5 items-center shadow-lg rounded-lg  justify-between gap-5'>
                                        <div className='p-5 bg-blue-500 text-white rounded-lg '>
                                        <VscDiffAdded size={30}/></div>
                                        <div className='flex-col flex flex-end'>
                                        <p className='text-lg font-semibold '>Total added blogs:</p>
                                       <p className='text-2xl font-bold flex justify-end '>{data1.length}</p>
                                       </div>
                                    </div>
                                    <div className='flex p-5 items-center shadow-lg rounded-lg  justify-between gap-5'>
                                        <div className='p-5 bg-green-300 text-white rounded-lg '><FcPaid size={30} /></div>
                                        <div className='flex-col flex flex-end'>
                                        <p className='text-lg font-semibold '>Total purchased blog:</p>
                                       <p className='text-2xl font-bold flex justify-end '>{data.length}</p>
                                       </div>
                                    </div>
                                    
                                   
                                    </div>
    {
      data.length>0?(<><h2 className="text-4xl font-semibold mb-4 text-center my-20">Purchased Blogs</h2>
        <div className="overflow-x-auto ">
  <table className="table border-3 border-[#318892]  rounded-lg shadow-md mt-10 mb-20">
    
    <thead>
      <tr className='text-[#318892] text-lg '>
        <th>
         Sl No
        </th>
        <th>Title</th>
        <th>Date</th>
        <th>Writer</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((dat,index)=><PremiumBlogs dat={dat} index={index} key={dat._id}></PremiumBlogs>)}
      
      </tbody>
    
  </table>
</div></>):<>
<h2 className="text-4xl font-semibold mb-4 text-center my-20 ">You Haven't Bought Any Blogs Yet</h2>
<Link href='/blogs'><button className='flex justify-center btn btn-lg bg-[#318892] mb-20 text-white p-3 rounded mx-auto'>Buy Blogs</button></Link>
</>
    }
     
    </div>
  )
}
