import React, { useState, useEffect } from "react";
import { useSubmitComment } from "./commentAPI";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";

const Upload = ({ postId }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const { mutateAsync: submitAsync } = useSubmitComment(
    postId,
    user.uid,
    comment
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment) {
      alert("댓글을 작성해주세요!");
    }
    try {
      const {
        data: { success },
      } = await submitAsync();
      console.log(success);
      if (success) {
        setComment("");
        alert("댓글 작성이 완료되었습니다!");
      }
    } catch (error) {
      alert("댓글 작성에 실패했습니다!");
    }
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
