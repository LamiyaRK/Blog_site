import { authOptions } from "@/lib/authOptions"
import dbConnect from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const DELETE=async(req,{params})=>{
    const {id}=params
    const session=await getServerSession(authOptions)
    if(!session)
    {
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const commentsCol=dbConnect("comments")
    const comment=await commentsCol.findOne({_id:new ObjectId(id)});
    const blogCol=dbConnect("blogs")
    const blog=await blogCol.findOne({_id:new ObjectId(comment.blogId)})
    if(comment.userEmail!=session?.user.email&&blog.email!=session?.user.email)
    {
         return NextResponse.json({message:"Unauthorized"},{status:401})
    }
    const result =await commentsCol.deleteOne({_id:new ObjectId(id)})
     return NextResponse.json({ success: true, deletedCount: result.deletedCount })
}



export const PATCH = async (req, { params }) => {
  const { id } = params
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const commentsCol = dbConnect("comments")
  const commentData = await commentsCol.findOne({ _id: new ObjectId(id) })

  if (!commentData) {
    return NextResponse.json({ message: "Comment not found" }, { status: 404 })
  }

  if (commentData.userEmail !== session.user.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { comment } = await req.json()

  if (!comment || !comment.trim()) {
    return NextResponse.json({ message: "Comment cannot be empty" }, { status: 400 })
  }

  const result = await commentsCol.updateOne(
    { _id: new ObjectId(id) },
    { $set: { comment: comment } }
  )

  return NextResponse.json({ success: true, modifiedCount: result.modifiedCount })
}
