import React, { useState, useEffect } from "react";
import axios from "axios";

const List = ({ list }) => {
  const [text, setText] = useState("");
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((res) => {
        if (res.data.success) {
          setPostList([...res.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>list!</h1>
      {postList.map((post, idx) => (
        <div key={idx}>
          <h1>제목 : {post.title}</h1>
          <h2>내용 : {post.content}</h2>
        </div>
      ))}
    </div>
  );
};

export default List;
