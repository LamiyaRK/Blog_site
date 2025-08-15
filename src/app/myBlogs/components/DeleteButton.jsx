"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'
export const dynamic = "force-dynamic";
export default  function DeleteButton({delid}) {
    const router=useRouter()
    const handleDelete=async(delid)=>{
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed) {
    const res=await fetch(`https://blog-site-sigma-puce.vercel.app/api/service/${delid}`,{
            method:'DELETE',
            
        })
        const data=await res.json()
        if(data.acknowledged
){
 Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
     router.refresh()
}
   
  }
});
        
       
    }
    
  return (
    <><button onClick={()=>{handleDelete(delid)}} className="btn btn-error text-white btn-sm" >Delete</button></>
  )
}
