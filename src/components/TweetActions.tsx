"use client";
import React from "react";
import {
  FaRegBookmark,
  FaRegComment,  
  FaTrash,
} from "react-icons/fa6";
import { FiRepeat } from "react-icons/fi";
import { IoIosStats } from "react-icons/io";
import { useUserSession } from "../../custom-hooks/useUserSession";
import { useDeleteTweet } from "../../custom-hooks/useTweet";
import { useRouter } from "next/navigation";
import { useCommentsCount } from "../../custom-hooks/useComment";
import LikeButton from "./LikeButton";

type TweetActionsProp = {
  creatorId: string;
  tweetId: string;
  imagePath: string;
  isTweetPostViewPage: boolean;
};

export default function TweetActions({
  creatorId,
  tweetId,
  imagePath,
  isTweetPostViewPage,
}: TweetActionsProp) {
  const { mutate } = useDeleteTweet();
  const { session } = useUserSession();
  const {data:commentsCount} = useCommentsCount(tweetId);
  const userId = session?.user.id;
  const router = useRouter();

  const handleDeleteTweet = () => {
    mutate(
      {
        tweetId,
        imagePath: imagePath || undefined,
      },
      {
        onSuccess: () => {
          if (isTweetPostViewPage) {
            router.replace("/home");
          }
        },
      }
    );
  };
  return (
    <div className="flex justify-between my-4">
      <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
        <FaRegComment />
        <span className="text-sm">{commentsCount}</span>
      </div>
      {creatorId === userId ? (
        <button
          onClick={handleDeleteTweet}
          className="text-red-700 flex items-center gap-1 cursor-pointer"
        >
          <FaTrash />
        </button>
      ) : (
        <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
          <FiRepeat />
          <span className="text-sm">7.5k</span>
        </div>
      )}
      <LikeButton tweetId={tweetId}userId={userId}session={session}/>
      <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
        <IoIosStats />
        <span className="text-sm">5k</span>
      </div>
      <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
        <FaRegBookmark size={20} />
      </div>
    </div>
  );
}
