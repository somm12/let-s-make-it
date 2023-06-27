import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PostDiv, BtnDiv, PostWrapperDiv } from "../../Style/DetailCSS.js";
const Detail = ({ post }) => {
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();
  let params = useParams();
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
      <PostDiv>
        <div className="title">{post.title}</div>
        <div className="userInfo" style={{ display: "flex" }}>
          <div style={{ width: "25px", marginRight: "5px" }}>
            <img style={{ borderRadius: "50%" }} src={post.author.photoURL} />
          </div>
          <div className="author">작성자: {post.author.displayName}</div>
        </div>

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
    </PostWrapperDiv>
  );
};

export default Detail;
