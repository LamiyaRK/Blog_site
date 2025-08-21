// app/(without-nav)/not-found.jsx
import Image from "next/image";
import './globals.css'
import { Inter } from 'next/font/google';
import HomeButton from "./Components/HomeButton";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NOTFOUNDPAGE404() {
 

  return (
    <html lang="en"><body>
    <div className="h-screen w-screen relative flex items-center justify-center">
      <Image
        src="/assets/404_page_cover.webp"
        alt="404 page"
        fill
        className="object-cover object-center"
      />
     <HomeButton></HomeButton>
    </div>
    </body></html>
  );
}
