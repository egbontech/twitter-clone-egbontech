import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import {
  useLikesCount,
  useToggleLike,
  useUserLike,
} from "../../custom-hooks/useLike";
import { Session } from "@supabase/supabase-js";

type LikeButtonProps = {
  tweetId: string;
  userId: string | undefined;
  session: Session | null;
};

export default function LikeButton({
  tweetId,
  userId,
  session,
}: LikeButtonProps) {
  const { data: hasLiked } = useUserLike(userId, tweetId);
  const { data: likesCount } = useLikesCount(tweetId);
  const { mutate } = useToggleLike();

  const handleLike = () => {
    if (!session) return;

    mutate({
      userId,
      tweetId,
      hasLiked: !!hasLiked,
    });
  };
  return (
    <>
      {hasLiked ? (
        <button
          onClick={handleLike}
          className="text-pink-700 flex items-center gap-1 hover:text-pink-400 cursor-pointer"
        >
          <FaHeart />
          <span className="text-sm">{likesCount}</span>
        </button>
      ) : (
        <button
          onClick={handleLike}
          className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer"
        >
          <FaRegHeart />
          <span className="text-sm">{likesCount}</span>
        </button>
      )}
    </>
  );
}
