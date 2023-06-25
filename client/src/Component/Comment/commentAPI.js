import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetComments = (postId) => {
  const data = useQuery(["comment", postId], () =>
    axios.get(`/api/comment/list/${postId}`)
  );

  return data;
};

export const useSubmitComment = (postId, uid, comment) => {
  const queryClient = useQueryClient();

  let body = {
    postId,
    uid,
    comment,
  };
  return useMutation(() => axios.post("/api/comment/submit", body), {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", postId]);
    },
  });
};

export const useEditComment = (postId, uid, comment, commentId) => {
  const queryClient = useQueryClient();

  let body = {
    postId,
    uid,
    comment,
    commentId,
  };
  return useMutation(() => axios.post("/api/comment/edit", body), {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", postId]);
    },
  });
};

export const useDeleteComment = (postId, uid, commentId) => {
  const queryClient = useQueryClient();

  let body = {
    postId,
    uid,
    commentId,
  };
  return useMutation(() => axios.post("/api/comment/delete", body), {
    onSuccess: () => {
      queryClient.invalidateQueries(["comment", postId]);
    },
  });
};
