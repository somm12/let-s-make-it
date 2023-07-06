import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PostDiv, BtnDiv, PostWrapperDiv } from "../../Style/DetailCSS.js";
import Spinner from "react-bootstrap/Spinner";
import Detail from "./Detail";
import FetchComment from "../Comment/FetchComment";
import axios from "axios";
const FetchPost = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [flag, setFlag] = useState(false);

  const fetchPost = async () => {
    let body = {
      postNum: params.postNum,
    };

    try {
      const { data } = await axios.post("/api/post/detail", body);
      if (data.success) {
        setPost(data.post);
        setFlag(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div>
      {flag ? (
        <>
          <Detail post={post} />
          <FetchComment postId={post._id} />
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default FetchPost;
