"use client";

import Link from "next/link";
import { useUserSession } from "../../custom-hooks/useUserSession";
import { supabase } from "../../lib/SupabaseClient";

export default function LogoutButton() {
  const { session } = useUserSession();

  const LogoutUser = async () => {
    const {error} = await supabase.auth.signOut();

    if(error){
        console.log("LogoutError:",error.message)
    }
  }
  return (
    <>
      {session ? (
        <button onClick={LogoutUser} className="hidden lg:block bg-white text-black p-3 w-full mt-3 font-bold rounded-full cursor-pointer">
          Logout
        </button>
      ) : (
        <Link
          href="/"
          className="hidden lg:block text-center bg-white text-black p-3 w-full mt-3 font-bold rounded-full cursor-pointer"
        >
          Log In
        </Link>
      )}
    </>
  );
}
