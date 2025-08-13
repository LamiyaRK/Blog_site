import Image from 'next/image'
import React from 'react'

export default function Instagram() {
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
  return (
    <div className='grid grid-cols-6 mt-20'>
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
  )
}
