import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";

const Upload = ({ postId }) => {
  console.log(postId);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment) {
      alert("댓글을 작성해주세요!");
    }
    let body = {
      postId: postId,
      uid: user.uid,
      comment,
    };
    try {
      const data = await axios.post("/api/comment/submit", body);
      if (data.data.success) {
        // setComment("");
        alert("댓글이 등록되었습니다!");
        window.location.reload();
      } else {
        alert("댓글 등록에 실패했습니다!");
      }
    } catch (e) {
      console.log(e.error);
    }
  };
  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인을 먼저 해주세요!");
      navigate("/login");
    }
  }, []);
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
