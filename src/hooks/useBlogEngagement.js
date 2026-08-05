import { useState, useEffect, useCallback } from "react";

// Tracks views, likes, and comments per post using localStorage.
// Swap the storage calls for a real backend/Firebase later if you want cross-device sync.
export function useBlogEngagement(postId) {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem(`blog:${postId}`) || "{}");
    const newViews = (store.views || 0) + 1;

    setViews(newViews);
    setLikes(store.likes || 0);
    setLiked(store.liked || false);
    setComments(store.comments || []);

    localStorage.setItem(
      `blog:${postId}`,
      JSON.stringify({ ...store, views: newViews }),
    );
  }, [postId]);

  const toggleLike = useCallback(() => {
    setLiked((prevLiked) => {
      const newLiked = !prevLiked;
      setLikes((prevLikes) => {
        const newLikes = prevLikes + (newLiked ? 1 : -1);
        const store = JSON.parse(
          localStorage.getItem(`blog:${postId}`) || "{}",
        );
        localStorage.setItem(
          `blog:${postId}`,
          JSON.stringify({ ...store, likes: newLikes, liked: newLiked }),
        );
        return newLikes;
      });
      return newLiked;
    });
  }, [postId]);

  const addComment = useCallback(
    (comment) => {
      setComments((prev) => {
        const updated = [...prev, comment];
        const store = JSON.parse(
          localStorage.getItem(`blog:${postId}`) || "{}",
        );
        localStorage.setItem(
          `blog:${postId}`,
          JSON.stringify({ ...store, comments: updated }),
        );
        return updated;
      });
    },
    [postId],
  );

  return { views, likes, liked, toggleLike, comments, addComment };
}
