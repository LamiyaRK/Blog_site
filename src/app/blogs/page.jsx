import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function BlogsPage() {
  const res = await fetch("http://localhost:3000/api/blogsall");
  const data = await res.json();
 console.log(data)
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-semibold mb-4 text-center my-20">All Articles & Insights</h2>
    <div className="grid grid-cols-3 gap-6  p-6 ">
      {data.map((dat) => (
      <Link href={`/blogs/${dat._id}` } key={dat._id}>  <div   className=" p-3 rounded-lg border border-gray-200 ">
          <div className="flex gap-5 items-center">
           
            <div
              style={{ width: 124, height: 103 }}
              className="flex-shrink-0 overflow-hidden rounded"
            >
              <Image
                src={dat.image}
                width={124}
                height={103}
                alt={dat.title}
                className="object-cover object-center w-full h-full"
              />
            </div>

            
            <div className="flex-1">
              <p className="text-lg font-medium leading-tight">{dat.title}</p>
              <p className="text-gray-500 pt-3 font-medium">{dat.date}</p>
            </div>
          </div>
        </div></Link>
      ))}
    </div>
    </div>
  );
}
