import Image from "next/image";

import LikeButton from "./LikeButton";

export default function BlogContent({ blog }) {
  const { image, title, date, category, tags, content, excerpt, likes } = blog;

  return (
    <div className="max-w-7xl w-5/6 mx-auto my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-end border relative h-[1200px] lg:h-[600px]">
        <div className="space-y-3 pl-5 pb-5 ">
          <p className="font-semibold">{date}</p>
          <h1 className="text-5xl max-w-md">{title}</h1>
          <p className="text-lg max-w-md">{excerpt}</p>
          <p className="text-sm text-[#08528b]">
            <i className="text-gray-400 mr-2">in</i>
            {category}
          </p>
        </div>
        <Image
          src={image}
          alt={title}
          width={1000}
          height={600}
          className="w-full h-[600px] object-cover object-center"
        />
      </div>

      <div className="border-b pb-4">
        <p className="text-lg text-left max-w-2xl mx-auto mt-10">{content}</p>
      </div>

      <div className="flex justify-between gap-3 items-center mt-4">
        
          <LikeButton  blogId={blog._id} initialLikes={likes}/>
       
        <div className="flex items-center gap-2">
          {tags.map((tag, index) => (
            <i
              className="border border-[#08528b] p-1"
              key={index}
            >
              {tag}
            </i>
          ))}
        </div>
      </div>
    </div>
  );
}
