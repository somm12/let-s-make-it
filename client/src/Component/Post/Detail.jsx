import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PostDiv, BtnDiv, PostWrapperDiv } from "../../Style/DetailCSS.js";
import Spinner from "react-bootstrap/Spinner";
const Detail = () => {
  let params = useParams();
  const user = useSelector((state) => state.user);
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

  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };

      axios
        .delete("/api/post/delete", {
          data: body,
        })
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패했습니다.");
          console.log(err);
        });
    }
  };
  return (
    <PostWrapperDiv>
      {flag ? (
        <>
          <PostDiv>
            <div className="title">{post.title}</div>
            <div className="author">작성자: {post.author.displayName}</div>
            {post.image && (
              <img style={{ width: "500px" }} src={post.image} alt="" />
            )}
            <div className="content">{post.content}</div>
          </PostDiv>
          {post.author.uid === user.uid && (
            <BtnDiv>
              <Link to={`/edit/${post.postNum}`}>
                <button className="editBtn">수정</button>
              </Link>
              <button className="deleteBtn" onClick={deleteHandler}>
                삭제
              </button>
            </BtnDiv>
          )}
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </PostWrapperDiv>
  );
};

export default Detail;
