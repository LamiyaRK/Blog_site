import React from 'react'
import CustomPaging from './CustomPaging';

export default function Banner() {
  const blogs = [
  {
    id: 1,
    image: "https://i.ibb.co/Kc5QxFtk/artem-verbo-Vc8jfmz-Wo-FE-unsplash.webp",
    title: "The Only Trend Emily Cares For is Getting Fit",
    category: "LIFESTYLE",
    writer: "Elayjah Johnson"
  },
  {
    id: 2,
    image: "https://i.ibb.co/MxGpQfdB/sl2.webp",
    title: "A Living Room That is Fit For The Millennials",
    category: "DIY",
    writer: "Michael Lee"
  },
  {
    id: 3,
    image: "https://i.ibb.co/Zzyr8GcF/sl3.webp",
    title: "Spending my Last Day Off on This Beautiful Resort",
    category: "DIY",
    writer: "Sophia Martinez"
  },
  {
    id: 4,
    image: "https://i.ibb.co/HT4FNHVN/artem-militonian-UYW6-FZLln-L8-unsplash.webp",
    title: "Going For a Quick Swim",
    category: "DIY",
    writer: "David Kim"
  }
];


  return (
    <div >
    {
        <CustomPaging blogs={blogs}></CustomPaging>
    }
    </div>

  )
}
