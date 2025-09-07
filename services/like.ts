import { supabase } from "../lib/SupabaseClient";

type ToggleLike = {
  userId: string | undefined;
  tweetId: string;
  hasLiked: boolean;
};

export const toggleLike = async ({ userId, tweetId, hasLiked }: ToggleLike) => {
  if (hasLiked) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("tweet_id", tweetId)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("likes").insert({
      tweet_id: tweetId,
      user_id: userId,
    });

    if (error) throw new Error(error.message);
  }
};

export const getUserLike = async (
  userId: string | undefined,
  tweetId: string
) => {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("user_id", userId)
    .eq("tweet_id", tweetId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return !!data;
};

export const getLikesCount = async (tweetId:string) => {
    const {count,error} = await supabase.from("likes").select("id",{head:true,count:"exact"}).eq("tweet_id",tweetId);

    if (error) throw new Error(error.message);

    return count ?? 0;
}
