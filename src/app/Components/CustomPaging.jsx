"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function CustomPaging({ blogs }) {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={blogs[i].image}
            alt={`thumb-${i}`}
            className="w-60 h-32 object-cover rounded"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    
    fade: true,
     waitForAnimate: false
  };

  return (
    <div className="slider-container max-w-full mx-auto  h-[800px] overflow-x-hidden  ">
        <Slider {...settings}>
    {blogs.map((blog) => (
      <div key={blog.id} className="relative  h-[700px]  rounded-lg">
        <Image
          src={blog.image}
          alt={blog.title}
          sizes="100vw"
           fill
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20  flex flex-col justify-center items-center text-white text-center px-4">
        <p className="text-sm  bg-black text-white px-2 py-1 rounded">
            {blog.category}
          </p>
          <h2 className="text-5xl max-w-2xl font-bold mt-4">{blog.title}</h2>
          <p className="mt-4 font-medium  text-white">
            {blog.writer}
          </p>
        </div>
      </div>
    ))}
  </Slider>
    </div>
  );
}
