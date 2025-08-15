import React from 'react';
import Timeline from './components/Timeline';


const Aboutus = () => {
   const timelineData = [
  {
    index: 1,
    year: "2022",
    title: "Blog Idea Sparked",
    description:
      "We noticed a gap in platforms where passionate writers could share long-form stories and insights easily. That’s when the idea of BlogSphere was born.",
    image: "/blog1.webp",
  },
  {
    index: 2,
    year: "2023",
    title: "Building the Platform",
    description:
      "We started developing a user-friendly blogging platform using React and Firebase. Focused on simplicity, fast performance, and a smooth writing experience.",
    image: "/blog2.webp",
  },
  {
    index: 3,
    year: "2024",
    title: "Community & Features",
    description:
      "Introduced categories, comment sections, and a recommendation system. Writers and readers could connect more meaningfully, creating a growing community.",
    image: "/blog3.webp",
  },
  {
    index: 4,
    year: "2025",
    title: "Going Live",
    description:
      "BlogSphere officially launched with a polished interface, mobile responsiveness, and a vibrant blog community. New features like analytics and editor tools are continuously added.",
    image: "/blog4.webp",
  },
];



    return (
        <div className='w-5/6 max-w-[1600px] mx-auto relative inset-0 py-10'>
        <h2 className='text-4xl  text-neutral text-center '>About Us</h2>
         <div className='flex lg:flex-row flex-col-reverse justify-between mb-[120px] inset-0 lg:h-[1000px] text-neutral'>
         <div className='lg:w-[40%] text-lg space-y-6'>
         <div className='space-y-6'>
            <h2 className='text-xl mb-2 text-secondary font-semibold'> — About InkSphere</h2>
            <h1 className='text-4xl  text-neutral mb-10'> Sharing Stories, One Blog at a Time</h1>
           
           
          <p className='text-3xl'>  Welcome to InkSphere, your space for discovering inspiring stories, insightful articles, and unique perspectives from writers around the world. Every post is a window into a new idea waiting to be explored.</p> 
          
           
<p className='opactiy-80'>We are a passionate team of writers, readers, and digital enthusiasts, dedicated to creating a vibrant community where ideas are shared and celebrated. From thought-provoking articles to personal stories—each blog we feature carries a voice worth hearing.</p>
        </div>
        </div>
        <div className='w-[300px] sm:w-[600px]  relative inset-0  h-[600px] sm:h-[1000px] mx-auto'>
        <div className='flex justify-end'>
            <img src='/aboutpat.webp' className='h-[250px] w-[200px] sm:h-[400px] sm:w-[300px] object-center object-cover   '></img>
        </div>
         <div className='absolute top-25 lg:top-50 shadow-2xl'>
          <img src='/aboutban.webp' className='h-[400px] sm:h-[700px] w-[250px] sm:w-[500px] object-center object-cover shadow-2xl shadow-black z-10'></img>
          </div>
        </div>
          </div>
       <p className='font-semibold text-xl text-center mb-4 text-secondary '>Timeline</p>
       <h1 className='text-4xl  text-neutral mb-10 text-center'>Our History</h1>
           
        <div >
           {
            timelineData.map(data=><Timeline key={data.index} data={data}></Timeline>)
           }
        </div>
        </div>
    );
};

export default Aboutus;