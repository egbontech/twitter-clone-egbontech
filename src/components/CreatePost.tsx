"use client";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaRegFaceSmile } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TbPhoto } from "react-icons/tb";
import { useGetUser } from "../../custom-hooks/useGetUser";
import { usePostTweet } from "../../custom-hooks/useTweet";
import { SpinnerCircularFixed } from "spinners-react";

export default function CreatePost() {
  const [post, setPost] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tweetImage, setTweetImage] = useState<null | File>(null);
  const fileref = useRef<HTMLInputElement | null>(null);
  const isDisabled = post.trim() === "" && !imagePreview;
  const { loading, session, profile, gettingSession } = useGetUser();
  const { mutate, isPending } = usePostTweet();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setTweetImage(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileref.current) fileref.current.value = "";
    setTweetImage(null);
  };

  const onEmojiClick = (emojidata: EmojiClickData) => {
    setPost((prev) => prev + emojidata.emoji);
  };

  const PostTweet = () => {
    if (!post.trim() && !tweetImage) {
      return;
    }

    if (!session?.user.id) return;

    mutate(
      {
        userId: session.user.id,
        content: post || null,
        tweetImage: tweetImage || null,
      },
      {
        onSuccess: () => {
          setPost("");
          setImagePreview(null);
          setTweetImage(null);
        },
        onError: (error) => {
          console.log("Failed to post tweet", error.message);
        },
      }
    );
  };

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
    <div
      className={`flex gap-4 p-4 border border-border ${
        isPending ? "opacity-30" : ""
      }`}
    >
      {profile?.avatar_url && (
        <Image
          src={profile.avatar_url}
          alt="profile-pic"
          width={500}
          height={500}
          className="w-10 h-10 object-cover rounded-full shrink-0"
        />
      )}
      <div className="w-full">
        <textarea
          placeholder="what's happening?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="w-full placeholder:text-secondary-text outline-none text-xl resize-none text-white"
        ></textarea>
        {imagePreview && (
          <div className="h-60 md:h-100 rounded-lg overflow-hidden border border-border mb-10 relative">
            <Image
              src={imagePreview}
              width={500}
              height={500}
              className="h-full w-full object-cover"
              alt="preview-image"
            />
            <button
              className="absolute top-5 right-5 bg-gray-600 w-10 h-10 text-2xl rounded-full opacity-50 cursor-pointer grid place-items-center"
              onClick={removeImage}
            >
              <RxCross2 />
            </button>
          </div>
        )}
        <div className="flex justify-between py-4 items-center border-t border-border">
          <div className="flex gap-3">
            <div
              className="text-primary cursor-pointer"
              onClick={() => fileref.current?.click()}
            >
              <TbPhoto size={20} />
            </div>
            <div
              className="text-primary cursor-pointer"
              onClick={() => setShowPicker(!showPicker)}
            >
              <FaRegFaceSmile size={20} />
            </div>
            <div className="text-primary cursor-pointer">
              <IoLocationOutline size={20} />
            </div>
            <div className="text-primary cursor-pointer">
              <RiCalendarScheduleLine size={20} />
            </div>
          </div>
          {isDisabled ? (
            <button className="text-black bg-secondary-text py-2 px-5 font-semibold cursor-pointer rounded-full">
              Post
            </button>
          ) : (
            <button
              onClick={PostTweet}
              className="text-black bg-white py-2 px-5 font-semibold cursor-pointer rounded-full"
            >
              Post
            </button>
          )}
          {showPicker && (
            <div className="fixed z-10 top-50 left-1/2 w-[90%] max-w-2xl -translate-x-1/2">
              <EmojiPicker
                theme={Theme.DARK}
                onEmojiClick={onEmojiClick}
                style={{
                  width: "100%",
                  background: "black",
                }}
              />
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileref}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
