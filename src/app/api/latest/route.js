import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server";

export const GET=async(req)=>{
    const blogscol=dbConnect("blogs")
    const result=await blogscol.find().sort({date:-1}).limit(4).toArray();
    return NextResponse.json(result)
}
