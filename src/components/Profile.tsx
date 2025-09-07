"use client";
import Image from "next/image";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useGetUser } from "../../custom-hooks/useGetUser";
import { SpinnerCircularFixed } from "spinners-react";

export default function Profile() {
  const { session, loading, profile, gettingSession } = useGetUser();

  if (loading)
    return (
      <div className="flex justify-center items-center py-4">
        <SpinnerCircularFixed size={25} color="#1DA1F2" />
      </div>
    );
  if (gettingSession)
    return (
      <div className="flex justify-center items-center py-4">
        <SpinnerCircularFixed size={25} color="#1DA1F2" />
      </div>
    );
  if (!session) return null;
  if (!profile) return null;
  return (
    <div className="mt-10 text-white flex justify-between items-center">
      <div className="flex items-center gap-2">
        {profile?.avatar_url && (
          <Image
            src={profile.avatar_url}
            alt="profile-pic"
            width={500}
            height={500}
            className="w-10 h-10 object-cover rounded-full"
          />
        )}
        <div className="hidden lg:block">
          <p className="font-semibold">{profile?.name}</p>
          <p className="text-secondary-text font-light">@{profile?.username}</p>
        </div>
      </div>
      <HiDotsHorizontal className="hidden lg:block" />
    </div>
  );
}
