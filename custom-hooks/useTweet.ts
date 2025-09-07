import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTweet, deleteTweet, getTweets } from "../services/tweet";

export const usePostTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      content,
      tweetImage,
    }: {
      userId: string;
      content: string | null;
      tweetImage: File | null;
    }) => createTweet(userId, content, tweetImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });
};

export const useGetTweets = () => {
  return useQuery({
    queryKey: ["tweets"],
    queryFn: getTweets,
  });
};

export const useDeleteTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      tweetId,
      imagePath,
    }: {
      tweetId: string;
      imagePath?: string;
    }) => deleteTweet(tweetId, imagePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
    },
  });
};
