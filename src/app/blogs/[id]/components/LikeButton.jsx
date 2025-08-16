"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";

export default function LikeButton({ blogId, initialLikes }) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  
  useEffect(() => {
    if (!session) return;

    const checkLiked = async () => {
      const res = await fetch(`/api/likeordislike/${blogId}`);
      const data = await res.json();
      setLiked(data.liked);
    };

    checkLiked();
  }, [session, blogId]);

  const handleLike = async () => {
    if (!session) {
      toast.error("Login to continue");
      return;
    }

    const res = await fetch(`/api/likeordislike/${blogId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liked: !liked })
    });

    const data = await res.json();

    if (data.success) {
      setLiked(!liked);
      setLikes(prev => liked ? prev - 1 : prev + 1);
    } else {
      toast.error(data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {liked
        ? <IoIosHeart size={20} color="red" onClick={handleLike} />
        : <IoIosHeartEmpty size={20} color="black" onClick={handleLike} />}
      {likes}
    </div>
  );
}
