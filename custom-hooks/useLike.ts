import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLikesCount, getUserLike, toggleLike } from "../services/like";

type ToggleLike = {
  userId: string | undefined;
  tweetId: string;
  hasLiked: boolean;
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, tweetId, hasLiked }: ToggleLike) =>
      toggleLike({ userId, tweetId, hasLiked }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["likes", variables.tweetId] });
      queryClient.invalidateQueries({ queryKey: ["likes-count", variables.tweetId] });
    },
  });
};

//function to check if user liked a tweet
export const useUserLike = (userId: string | undefined, tweetId: string) => {
    return useQuery({
        queryFn:() => getUserLike(userId,tweetId),
        queryKey:["likes",tweetId,userId],
        enabled:!!tweetId && !!userId
    })
};


export const useLikesCount = (tweetId:string) => {
    return useQuery({
        queryKey:["likes-count",tweetId],
        queryFn:() => getLikesCount(tweetId),
        enabled:!!tweetId
    })
}