import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListDiv } from "../../Style/ListCSS.js";

import axios from "axios";

const List = ({ list }) => {
  const [text, setText] = useState("");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/post/list")
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
        <ListDiv key={post._id}>
          <Link to={`/post/${post.postNum}`}>
            <h1>제목 : {post.title}</h1>
            <h2>작성자: {post.author.displayName}</h2>
            <h2>내용 : {post.content}</h2>
          </Link>
        </ListDiv>
      ))}
    </div>
  );
};

export default List;
