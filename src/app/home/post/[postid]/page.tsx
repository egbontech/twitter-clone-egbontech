import Comments from "@/components/Comments";
import GoBackButton from "@/components/GoBackButton";
import ReplyPost from "@/components/ReplyPost";
import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { supabase } from "../../../../../lib/SupabaseClient";
import { Tweet } from "../../../../../types/types";
import moment from "moment";
import TweetActions from "@/components/TweetActions";



const getTweet = async (id: string) => {
  const { error, data } = await supabase
    .from("tweets")
    .select("*,profiles(id,username,avatar_url,name)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return data;
};

export default async function Page({ params }: { params: { postid: string } }) {
  const tweet: Tweet = await getTweet(params.postid);
  return (
    <div>
      <div className="flex justify-between items-center mb-3 px-4 py-2">
        <div className="text-white flex items-center gap-3">
          <GoBackButton />
          <span className="font-bold text-xl">Post</span>
        </div>
        <button className="border border-border rounded-full px-4 py-1 cursor-pointer text-white">
          Reply
        </button>
      </div>
      <div className="px-4 py-2 flex gap-3 border-b border-border">
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
            <div className="text-white my-2 block">{tweet.content}</div>
          )}
          {tweet.image_url && (
            <div>
              <Image
                src={tweet.image_url}
                alt="post-image"
                width={1800}
                height={1800}
                className="h-70 md:h-130 w-full rounded-lg border border-border object-cover"
              />
            </div>
          )}
          <TweetActions
            creatorId={tweet.profiles.id}
            tweetId={tweet.id}
            imagePath={tweet.image_Path}
            isTweetPostViewPage={true}
          />
        </div>
      </div>
      <ReplyPost tweetId={tweet.id}/>
      <Comments tweetId={tweet.id}/>
    </div>
  );
}
