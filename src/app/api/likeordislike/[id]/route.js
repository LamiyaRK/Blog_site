import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ liked: false });
  }

  const likesCol = dbConnect("likes");
  const likeDoc = await likesCol.findOne({
    blogId: params.id,
    userEmail: session.user.email
  });

  return NextResponse.json({ liked: likeDoc?.liked || false });
};

export const PATCH = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { liked } = await req.json();
  const likesCol = dbConnect("likes");
  const blogsCol = dbConnect("blogs");

  // Update or insert into likes collection
  await likesCol.updateOne(
    { blogId: params.id, userEmail: session.user.email },
    { $set: { blogId: params.id, userEmail: session.user.email, liked } },
    { upsert: true }
  );

  // Update like count in blogs collection
  const incValue = liked ? 1 : -1;
  await blogsCol.updateOne(
    { _id: new ObjectId(params.id) },
    { $inc: { likesCount: incValue } }
  );

  revalidatePath(`/blogs/${params.id}`);
  return NextResponse.json({ success: true });
};
