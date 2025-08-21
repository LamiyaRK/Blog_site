import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaHeart, FaPinterestP } from 'react-icons/fa'
import { FaSquareInstagram, FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
     const list=<>
 <li><Link href='/'>Home</Link></li>
 <li><Link href='/about'>About</Link></li>
  <li><Link href='/contact'>Contact</Link></li>
   <li><Link href='/blogs'>Blogs</Link></li>
    </>
  return (
    <div className='py-20 bg-black'>
        <div className='flex justify-center items-center gap-5 text-white'>
           <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <div className='p-3 rounded-full bg-white/10'>
          <FaFacebookF size={30} />
        </div>
      </a>

      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <div className='p-3 rounded-full bg-white/10'>
          <FaXTwitter size={30}/>
        </div>
      </a>

      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <div className='p-3 rounded-full bg-white/10'>
          <FaSquareInstagram size={30}/>
        </div>
      </a>

      <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
        <div className='p-3 rounded-full bg-white/10'>
          <FaPinterestP size={30}/>
        </div>
      </a>

      <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
        <div className='p-3 rounded-full bg-white/10'>
          <FaHeart size={30}/>
        </div>
      </a>
        </div>
        <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1 text-lg font-semibold mx-auto my-5 text-white">
      {list}
    </ul>
  </div>
  <aside>
    <p className='text-center text-white/40 font-semibold'>Copyright © {new Date().getFullYear()} - All right reserved by InkSphere</p>
  </aside>
    </div>
  )
}
