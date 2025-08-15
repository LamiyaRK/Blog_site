import Image from "next/image";
import CustomPaging from "./Components/CustomPaging";
import Banner from "./Components/Banner";
import Popular from "./Components/Popular";
import Double from "./Components/Double";
import SideHome from "./Components/SideHome";
import Instagram from "./Components/Instagram";
import Footer from "@/Components/Footer";
import { ToastContainer } from "react-toastify";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <div>
      <Banner></Banner>
     
     
      <Popular></Popular>
       <div className="flex max-w-7xl w-5/6 mx-auto justify-between gap-5">
       <div className="w-[65%]">
      <Double></Double>
      
      </div>
      <div className="w-[30%]">
      <SideHome></SideHome>
      </div>
      </div>
      <Instagram></Instagram>
      <Footer></Footer>
     
    </div>
    
  );
}
