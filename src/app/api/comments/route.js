import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const  GET=async(req)=>{
       const {searchParams}=new URL(req.url);
       const blogId=searchParams.get("blogId")
       if(!blogId) return NextResponse.json({message:"blogId required"},{status:400})
        const commentscol=dbConnect("comments")
       const comments=await commentscol.find({blogId}).sort({createdAt:-1}).toArray()
       return NextResponse.json(comments)
}

export const POST=async(req)=>{
    const session=await getServerSession(authOptions)
    if(!session?.user?.email)
    {
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const {blogId,comment}=await req.json()
    if(!blogId||!comment)
    {
        return NextResponse.json({message:"Missing Files"},{status:400})
    }
     const commentsCol = dbConnect("comments");
      const newComment = {
    blogId,
    userEmail: session.user.email,
    userName: session.user.name,
    comment,
    createdAt: new Date(),
  };
  const result=await commentsCol.insertOne(newComment)
  return NextResponse.json({ ...newComment, _id: result.insertedId })
}