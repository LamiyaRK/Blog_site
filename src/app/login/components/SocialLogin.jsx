"use client";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SocialLogin() {
  const handleSocialLogin = async (providerName) => {
    const result = await signIn(providerName, {
      redirect: true,   // redirect default true
      callbackUrl: "/", // login successful হলে / এ যাবে
    });

   
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-5">
      <div
        onClick={() => handleSocialLogin("google")}
        className="bg-gray-200 p-3 rounded-full cursor-pointer hover:bg-gray-300 transition"
      >
        <FaGoogle size={30} />
      </div>
      <div
        onClick={() => handleSocialLogin("github")}
        className="bg-gray-200 p-3 rounded-full cursor-pointer hover:bg-gray-300 transition"
      >
        <FaGithub size={30} />
      </div>
    </div>
  );
}
