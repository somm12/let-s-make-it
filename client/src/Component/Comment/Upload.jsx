import React, { useState } from "react";
import useSubmitComment from "./commentAPI";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";

const Upload = ({ postId }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const submitCommentQuery = useSubmitComment(postId, user.uid, comment);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment) {
      alert("댓글을 작성해주세요!");
    }

    submitCommentQuery.mutate();

    // let body = {
    //   postId: postId,
    //   uid: user.uid,
    //   comment,
    // };
    // try {
    //   const data = await axios.post("/api/comment/submit", body);
    //   if (data.data.success) {
    //     // setComment("");
    //     alert("댓글이 등록되었습니다!");
    //     window.location.reload();
    //   } else {
    //     alert("댓글 등록에 실패했습니다!");
    //   }
    // } catch (e) {
    //   console.log(e.error);
    // }
  };

  return (
    <div>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
      />
      <button onClick={submitHandler}>등록</button>
    </div>
  );
};

export default Upload;
