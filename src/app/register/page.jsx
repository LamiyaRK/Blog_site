import Image from 'next/image'

import React from 'react'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <div className='max-w-7xl w-5/6 mx-auto my-20 '>
     <h2 className="text-5xl font-bold mb-6 text-center">Register</h2>
     <div className='flex items-center gap-10'>
    <div className='w-[50%] my-10'>
         <Image
            src='https://i.ibb.co.com/5WK3sZJN/melinda-gimpel-uc-F-Db-Af-IIk-unsplash.webp'
            alt='login'
            width={1000}
            height={700}
            className="w-full h-[600px] object-cover object-center"
             />
     </div>
       
             <div className='w-[50%] max-w-md'>
           <RegisterForm></RegisterForm>
             </div>
             </div>
    </div>
  )
}
