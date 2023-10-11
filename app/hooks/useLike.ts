import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import getPostById from "../actions/getPostById";
import getPosts from "../actions/getPosts";
import getCurrentUser from "../actions/getCurrentUser";

const useLike = async ({ postId, userId }: { postId: string, userId?: string }) => {
  const currentUser = await getCurrentUser();
  const fetchedPost = await getPostById(postId);
  const mutateFetchedPosts = await getPosts(userId);


  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id as string);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete('/api/like/[likeId]', { data: { postId } });
      } else {
        request = () => axios.post('/api/like', { postId });
      }

      await request();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, hasLiked, postId]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;