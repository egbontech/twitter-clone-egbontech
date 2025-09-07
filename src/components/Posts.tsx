"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useGetTweets } from "../../custom-hooks/useTweet";
import { Tweet } from "../../types/types";
import moment from "moment";
import TweetActions from "./TweetActions";
import { SpinnerCircularFixed } from "spinners-react";

export default function Posts() {
  const { isLoading, isError, error, data: tweets } = useGetTweets();

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-30">
        <SpinnerCircularFixed size={25} color="#1DA1F2" />
      </div>
    );
  if (isError) return <h1 className="text-2xl text-white">{error.message}</h1>;
  return (
    <div>
      {tweets?.map((tweet: Tweet) => {
        return (
          <div
            key={tweet.id}
            className="px-4 py-2 flex gap-3 border-b border-border"
          >
            <Image
              src={tweet.profiles.avatar_url}
              alt="profile-pic"
              width={100}
              height={100}
              className="w-10 h-10 object-cover rounded-full shrink-0"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <div className="flex gap-1 items-center text-sm">
                  <span className="text-white font-bold">
                    {tweet.profiles.name}
                  </span>
                  <span className="text-secondary-text">
                    @{tweet.profiles.username}
                  </span>
                  <span className="text-secondary-text">
                    {moment(tweet.created_at).fromNow()}
                  </span>
                </div>
                <BsThreeDots className="text-secondary-text" />
              </div>
              {tweet.content && (
                <Link
                  href={`/home/post/${tweet.id}`}
                  className="text-white my-2 block"
                >
                  {tweet.content}
                </Link>
              )}
              {tweet.image_url && (
                <Link href={`/home/post/${tweet.id}`}>
                  <Image
                    src={tweet.image_url}
                    alt="post-image"
                    width={1800}
                    height={1800}
                    className="h-70 md:h-130 w-full rounded-lg border border-border object-cover"
                  />
                </Link>
              )}
              <TweetActions
                creatorId={tweet.profiles.id}
                tweetId={tweet.id}
                imagePath={tweet.image_Path}
                isTweetPostViewPage={false}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
