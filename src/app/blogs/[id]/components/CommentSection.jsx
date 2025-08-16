"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'

export default function CommentSection({ blogId, blogOwnerEmail }) {
  const { data: session } = useSession()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    fetch(`/api/comments?blogId=${blogId}`)
      .then(res => res.json())
      .then(data => setComments(data))
  }, [blogId])

  // ------------------- POST NEW COMMENT -------------------
  const handleComment = async () => {
    if (!session) return toast.error("Login to comment")
    if (!newComment.trim()) return toast.error("Comment cannot be empty")

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ blogId, comment: newComment })
    })
    const data = await res.json()
    if (res.ok) {
      setComments([data, ...comments])
      setNewComment('')
    } else {
      toast.error(data.message || "Failed to add comment")
    }
  }


  const handleDelete = async (commentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    })
    if (result.isConfirmed) {
      const res = await fetch(`/api/comments/${commentId}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok) {
        setComments(comments.filter(c => c._id !== commentId))
        Swal.fire('Deleted!', 'Comment has been deleted.', 'success')
      } else {
        toast.error(data.message || "Failed to delete")
      }
    }
  }


  const handleEdit = (commentId, text) => {
    setEditingCommentId(commentId)
    setEditingText(text)
  }

  const saveEdit = async (commentId) => {
    if (!editingText.trim()) return toast.error("Comment cannot be empty")
    const res = await fetch(`/api/comments/${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: editingText })
    })
    const data = await res.json()
    if (res.ok) {
      setComments(comments.map(c => c._id === commentId ? { ...c, comment: editingText } : c))
      setEditingCommentId(null)
      toast.success("Comment updated")
    } else {
      toast.error(data.message || "Failed to update comment")
    }
  }


  return (
    <div className='mt-10'>
      <p className='text-3xl font-bold'>Comments</p>

     
      <div className='flex gap-2 items-center mt-3'>
        <input
          type='text'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder='Write a comment...'
          className='w-full rounded-full px-5 py-3'
        />
        <button onClick={handleComment} className='btn btn-neutral'>Post</button>
      </div>

      
      <div className="space-y-3 mt-5">
        {comments.map(comment => {
          const isCommentOwner = session?.user?.email === comment.userEmail
          const isBlogOwner = session?.user?.email === blogOwnerEmail

          return (
            <div key={comment._id} className="border-b pb-2">
              <div className='flex justify-between items-start'>
                <div className='w-full'>
                  <p className="font-semibold">{comment.userName}</p>

                  {editingCommentId === comment._id ? (
                    <div className='flex gap-2 mt-1'>
                      <input
                        type='text'
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className='w-full border rounded px-3 py-1'
                      />
                      <button onClick={() => saveEdit(comment._id)} className='btn btn-sm btn-success'>Save</button>
                      <button onClick={() => setEditingCommentId(null)} className='btn btn-sm btn-neutral'>Cancel</button>
                    </div>
                  ) : (
                    <p>{comment.comment}</p>
                  )}

                  <small className="text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </div>

                <div className='flex flex-col gap-1 ml-3'>
                  {isCommentOwner && (
                    <>
                      <CiEdit color='green' size={24} onClick={() => handleEdit(comment._id, comment.comment)} />
                      <MdDelete color='red' size={24} onClick={() => handleDelete(comment._id)} />
                    </>
                  )}
                  {!isCommentOwner && isBlogOwner && (
                    <MdDelete color='red' size={24} onClick={() => handleDelete(comment._id)} />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
