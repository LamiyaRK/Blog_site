

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const GET=async(req)=>{
   const session=await getServerSession(authOptions)
   console.log(session)
   if(session)
   { 
      const email=session?.user?.email
       const blogscol =dbConnect("blogs");
   const result=await blogscol.find({email}).toArray();
    return NextResponse.json(result)
   
   }
   
   return NextResponse.json([])


}
export const POST=async(req)=>{
   const posteddata=await req.json();
   const blogscol =dbConnect("blogs");
   const result=await blogscol.insertOne(posteddata);
   return NextResponse.json(result)


}