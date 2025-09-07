"use client";
import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useGetComments } from "../../custom-hooks/useComment";
import { Comment } from "../../types/types";
import moment from "moment";
import CommentActions from "./CommentActions";

export default function Comments({ tweetId }: { tweetId: string }) {
  const { error, isError, isLoading, data: comments } = useGetComments(tweetId);

  if (isLoading) return <h1 className="text-white text-xl">Loading...</h1>;
  if (isError) return <h1 className="text-white text-2xl">{error.message}</h1>;
  return (
    <div>
      {comments?.map((comment: Comment) => {
        return (
          <div
            key={comment.id}
            className="px-4 py-2 flex gap-3 border-b border-border"
          >
            <Image
              src={comment.profiles.avatar_url}
              alt="profile-pic"
              width={100}
              height={100}
              className="w-10 h-10 object-cover rounded-full shrink-0"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <div className="flex gap-1 items-center text-sm">
                  <span className="text-white font-bold">
                    {comment.profiles.name}
                  </span>
                  <span className="text-secondary-text">
                    @{comment.profiles.username}
                  </span>
                  <span className="text-secondary-text">
                    {moment(comment.created_at).fromNow()}
                  </span>
                </div>
                <BsThreeDots className="text-secondary-text" />
              </div>
              <div className="text-white my-2 block">{comment.content}</div>
              <CommentActions
                creatorId={comment.profiles.id}
                commentId={comment.id}
                tweetId={comment.tweet_id}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
