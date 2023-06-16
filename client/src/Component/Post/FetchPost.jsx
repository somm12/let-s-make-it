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

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.post);
          setPost(res.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
