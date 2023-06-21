import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetComments = (postId) => {
  const data = useQuery(["comment", postId], () =>
    axios.get(`/api/comment/list/${postId}`)
  );
  console.log(data, "!!!");
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
