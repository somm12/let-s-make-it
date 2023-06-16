import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentContent from "./CommentContent";

const List = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);
  console.log(postId);
  const fetchComments = async () => {
    let body = {
      postId,
    };
    try {
      const data = await axios.post("/api/comment/list", body);
      if (data.data.success) {
        console.log(data.data);
        setCommentList([...data.data.commentList]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div>
      {commentList.map((comment, idx) => (
        <CommentContent comment={comment} key={idx} />
      ))}
    </div>
  );
};

export default List;
