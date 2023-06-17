import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
export default function useSubmitComment(postId, uid, comment) {
  const queryClient = useQueryClient();

  let body = {
    postId,
    uid,
    comment,
  };
  return useMutation(
    () => axios.post("/api/comment/submit", body, { withCredentials: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment", postId]);
      },
    }
  );
}
