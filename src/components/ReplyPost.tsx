"use client";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaRegFaceSmile } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { TbPhoto } from "react-icons/tb";
import { useUserSession } from "../../custom-hooks/useUserSession";
import { useCreateComment } from "../../custom-hooks/useComment";
import { useGetUser } from "../../custom-hooks/useGetUser";

export default function ReplyPost({ tweetId }: { tweetId: string }) {
  const [reply, setReply] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileref = useRef<HTMLInputElement | null>(null);
  const isDisabled = reply.trim() === "" && !imagePreview;
  const { mutate, isPending } = useCreateComment();
  const { session } = useUserSession();
   const { loading,  profile, gettingSession } = useGetUser();
  const userId = session?.user.id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileref.current) fileref.current.value = "";
  };

  const onEmojiClick = (emojidata: EmojiClickData) => {
    setReply((prev) => prev + emojidata.emoji);
  };

  const PostComment = () => {
    if (!reply.trim()) return;
    if (!userId) return;

    mutate(
      {
        userId,
        tweetId,
        content: reply,
      },
      {
        onSuccess: () => {
          setReply("");
        },
      }
    );
  };

  
  if (!profile) return null;
  if (!session) return null;
  return (
    <div
      className={`flex gap-4 p-4 border border-border ${
        isPending ? "opacity-30" : ""
      }`}
    >
      <Image
        src={profile?.avatar_url}
        alt="profile-pic"
        width={500}
        height={500}
        className="w-10 h-10 object-cover rounded-full shrink-0"
      />
      <div className="w-full">
        <textarea
          placeholder="what's happening?"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
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
              onClick={PostComment}
              className="text-black bg-white py-2 px-5 font-semibold cursor-pointer rounded-full"
            >
              Post
            </button>
          )}
          {showPicker && (
            <div className="fixed z-10 top-10 left-1/2 w-[90%] max-w-2xl -translate-x-1/2">
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
