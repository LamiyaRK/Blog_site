import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { NextResponse } from "next/server";

export  const GET=async(req,{params})=>{
    const p=await params;
    const blogcol=dbConnect('blogs')
    
    const data=await blogcol.findOne({_id:new ObjectId(p.id)});
    return NextResponse.json(data)

}
export const DELETE=async(req,{params})=>{
    const p=await params;
    const blogcol=dbConnect('blogs')
    const session=await getServerSession(authOptions)
    const finduser=await blogcol.findOne({_id:new ObjectId(p.id)})
    if(finduser.email==session?.user?.email)
    { const data=await blogcol.deleteOne({_id:new ObjectId(p.id)});
    revalidatePath('/myBlogs')
    return NextResponse.json(data)

    }else
    {
        NextResponse.json({success:false,message:"Forbidden Action"},{status:401})
    }
   
}
export const PATCH=async(req,{params})=>{
      const p=await params;
    const blogcol=dbConnect('blogs')
    const session=await getServerSession(authOptions)
   
    const finduser=await blogcol.findOne({_id:new ObjectId(p.id)})
     if(finduser.email==session?.user?.email)
    {    const body=await req.json()
        const filter={
            $set:body
        }
        const option={
            upsert:false
        }
        const data=await blogcol.updateOne({_id:new ObjectId(p.id)},filter,option);
   revalidatePath('/myBlogs')
    return NextResponse.json(data)

    }else
    {
        NextResponse.json({success:false,message:"Forbidden Action"},{status:401})
    }
}