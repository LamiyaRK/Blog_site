import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server";

export const GET=async(req)=>{
    const blogscol=dbConnect("blogs")
    const result=await blogscol.aggregate([
        {
            $group:{
                _id:"$category",
                count:{$sum:1}
            }
        },
           {
             $project:{
                _id:0,
                category:"$_id",
                count:1
            }
           }
        
    ]).toArray();
    return NextResponse.json(result)
}
