import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ListDiv } from "../../Style/ListCSS.js";

import axios from "axios";

const List = ({ list }) => {
  const [text, setText] = useState("");
  const [postList, setPostList] = useState([]);
  const URI = "v1/pathfinder/music/mylist";
  const API_KEY = "6d79e41a-6e8f-406a-a5e4-99efcbcc63fa";

  const getMusic = async () => {
    try {
      const data = await axios.get(URI, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      console.log(data, "엥");
    } catch (err) {
      // const headers = { 'Authorization': `Bearer ${API_KEY}`};
      // const data = axios.get(URI,{ headers },{ withCredentials: true })
      // console.log(data)

      console.log(err);
    }
  };
  useEffect(() => {
    getMusic();
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
        <ListDiv key={idx}>
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
