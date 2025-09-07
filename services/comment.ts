import { supabase } from "../lib/SupabaseClient";

export const createComment = async (
  userId: string,
  tweetId: string,
  content: string
) => {
  const { error: insertError } = await supabase.from("comments").insert({
    user_id: userId,
    tweet_id: tweetId,
    content,
  });

  if (insertError) {
    console.log("commentInsertError:", insertError.message);
    return;
  }

  return true;
};

export const getComments = async (tweetId: string) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*,profiles (id,name,username,avatar_url)")
    .eq("tweet_id", tweetId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("fetchCommentsError:", error.message);
    return;
  }

  return data ?? [];
};

export const deleteComment = async (commentId: string) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw new Error(error.message);
  }
};

export const getCommentsCount = async (tweetId: string) => {
  const {error,count} = await supabase
    .from("comments")
    .select("id", { head: true, count: "exact" })
    .eq("tweet_id", tweetId);

    if(error){
        console.log("commentsCountError:",error.message);
    }

    return count ?? 0;
};
