
import Image from 'next/image';
import React from 'react'
import { IoIosHeartEmpty } from 'react-icons/io';
import UnlockFrom from './components/UnlockFrom';
import BlogContent from './components/BlogContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function BlogDetailsPage({params}) {
    const p=await params;
    const res=await fetch(`http://localhost:3000/api/service/${p.id}`)
    const blogdata=await res.json()
     const session=await getServerSession(authOptions)
   
if (blogdata.isPremium&&session?.user?.email!=blogdata.email) {
    return (
      <div className="relative">
        {/* Blurred Blog Content */}
        <div >
          <BlogContent blog={blogdata} />
        </div>

        {/* Modal on top */}
        <UnlockFrom blog={blogdata} />
      </div>
    );
  }

  return <BlogContent blog={blogdata} />;
}
