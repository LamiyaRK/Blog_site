"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { IoIosArrowDropleft, IoIosArrowDropright} from "react-icons/io";

export default function BlogCarousel({ blogs }) {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="w-full max-w-7xl w-5/6 mx-auto px-4 py-8 border border-gray-200">
      <Slider ref={sliderRef} {...settings}>
        {blogs.map((blog) => (
          <div key={blog.id} className="px-4 transition-transform duration-500">
            <div className=" overflow-hidden  h-[400px] bg-white flex flex-col">
              <Image
                src={blog.image}
                alt={blog.title}
                width={350}
                height={240}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 text-center">
               <p className="text-sm text-[#08528b] "><i className="text-gray-400 mr-2">in</i>{blog.category}</p>
                <h3 className="text-lg font-bold mb-2 mt-5 max-w-xs mx-auto">{blog.title}</h3>
               
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom Buttons */}
      <div className="flex justify-center">
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="rounded-full "
        >
         <IoIosArrowDropleft size={50} />
        </button>
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="rounded "
        >
          <IoIosArrowDropright size={50} />
        </button>
      </div>
    </div>
  );
}
