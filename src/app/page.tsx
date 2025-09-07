"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signInUser } from "../../services/auth";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/SupabaseClient";


export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const signin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage("All fields are required!");
      return;
    }

    const result = await signInUser(email,password);
    if(result?.error){
      setMessage(result.error);
    } else {
      setMessage("Login successful");
      setTimeout(() => {
        router.replace("/auth/callback");
      }, 2000);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({data:{session}}) => {
      if(session){
        router.replace("/auth/callback");
      }      
    })
  },[router]);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[300px] w-[95%] py-12 rounded-lg">
        <h2 className="font-bold text-3xl text-primary-text">Sign in to X</h2>
        <button className="bg-white w-full mt-8 h-10 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-full">
          <Image
            src="/images/google-icon.png"
            alt="google-icon"
            width={470}
            height={470}
            className="w-6 h-6 object-cover"
          />
          <span>Sign in with google</span>
        </button>
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-border"></div>
          <span className="mx-4 text-md text-primary-text">or</span>
          <div className="flex-grow h-px bg-border"></div>
        </div>
         {message && (
          <p className="bg-primary py-1 mb-4 font-semibold text-center">
            {message}
          </p>
        )}
        <form onSubmit={signin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="mb-6 w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
            className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white"
          />
          <button className="text-black w-full mt-8 rounded-full h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold bg-white">
            Continue
          </button>
        </form>
        <button className="text-white w-full mt-8 rounded-full h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold border border-border hover:text-black">
          Forgot Password?
        </button>
        <div className="text-secondary-text mt-8">
          <span className="mr-1">Don&apos;t have an account?</span>
          <Link href="/auth/signup" className="text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
