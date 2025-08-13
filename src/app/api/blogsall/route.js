import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server";

export const GET=async(req)=>{
    const blogscol=dbConnect("blogs")
    const result=await blogscol.find().toArray();
    return NextResponse.json(result)
}
