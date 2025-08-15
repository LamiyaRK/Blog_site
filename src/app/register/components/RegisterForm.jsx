"use client";
import React from "react";
import Link from "next/link";
import registerUser from "@/app/actions/auth/registerUser";
import SocialLogin from "@/app/login/components/SocialLogin";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
   const router=useRouter()
  const handleFormData = async (e) => {
  e.preventDefault();
  const formData = e.target;
  const name = formData.name.value.trim();
  const photo = formData.photo.value.trim();
  const email = formData.email.value.trim();
  const password = formData.password.value;

  try {
    const res = await registerUser({ name, photo, email, password });
    if (res) {
      
      
      // Automatically log the user in
      console.log("before",email,password)
     const loginRes= await signIn("credentials",{email,password,redirect:false})
console.log("why not working",loginRes)
      if (loginRes.ok) {
         router.push('/')
             formData.reset()
       toast.success("Registration successful");
        
      } else {
        toast.error("❌ Auto login failed");
      }
    } else {
      toast.error("❌ Registration failed: User may already exist");
    }
  } catch (error) {
    toast.error("❌ Error registering:", error);
  }
};

  return (
    <div>
      <form onSubmit={handleFormData}>
        <label htmlFor="name" className="block mb-2 font-medium">Name</label>
        <input id="name" name="name" type="text" placeholder="Your name" required className="w-full p-2 mb-4 border rounded" />

        <label htmlFor="photo" className="block mb-2 font-medium">Photo</label>
        <input id="photo" name="photo" type="url" placeholder="Your photo URL" required className="w-full p-2 mb-4 border rounded" />

        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" required className="w-full p-2 mb-4 border rounded" />

        <label htmlFor="password" className="block mb-2 font-medium">Password</label>
        <input id="password" name="password" type="password" placeholder="Your password" minLength={6} required className="w-full p-2 mb-6 border rounded" />

        <button type="submit" className="w-full btn bg-[#318892] text-white p-3 rounded">
          Register
        </button>
      </form>

      <p className="text-sm mt-5 text-center">OR Register With</p>
      <SocialLogin />

      <p className="text-sm mt-5 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-[#318892]">Login</Link>
      </p>
    </div>
  );
}
