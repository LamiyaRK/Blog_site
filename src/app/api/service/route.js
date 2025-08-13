"use server"
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export const GET=async(req)=>{
   const session=await getServerSession(authOptions)
   
   if(session)
   {
      const email=session?.user?.email
       const paidPremiumcol =dbConnect("paidPremium");
   const result=await paidPremiumcol.find({email}).toArray();
    return NextResponse.json(result)
   }
   
   return NextResponse.json([])


}

export const POST=async(req)=>{
   const posteddata=await req.json();
   const paidPremiumcol =dbConnect("paidPremium");
   const result=await paidPremiumcol.insertOne(posteddata);
   return NextResponse.json(result)


}