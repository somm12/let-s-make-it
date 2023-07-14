import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addBookmark, deleteBookmark } from "../../Reducer/userSlice";

import { PostDiv, BtnDiv, PostWrapperDiv } from "../../Style/DetailCSS.js";
const Detail = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [isBookmark, setIsBookmark] = useState(
    user.bookmark.some((postId) => postId === post._id)
  );

  console.log(isBookmark, "유저 정보!");
  let navigate = useNavigate();
  let params = useParams();
  const deleteHandler = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };

      try {
        const { data } = await axios.delete("/api/post/delete", {
          data: body,
        });
        if (data.success) {
          alert("게시글이 삭제되었습니다.");
          navigate("/");
        }
      } catch (e) {
        alert("게시글 삭제에 실패했습니다.");
        console.log(e);
      }
    }
  };

  const bookmarkHandler = async (e) => {
    e.preventDefault();

    if (!isBookmark) {
      console.log("?D");
      // 북마크가 안되어 있다면
      try {
        let body = {
          postId: post._id,
          uid: user.uid,
        };

        const { data } = await axios.post("/api/user/bookmark/add", body);
        if (data.success) {
          dispatch(addBookmark({ postId: post._id }));
          setIsBookmark((prev) => !prev);
        }
      } catch (e) {
        console.log(e);
      }
    }
    // 북마크가 연결되었다면,
    else {
      try {
        let body = {
          postId: post._id,
          uid: user.uid,
        };
        const { data } = await axios.post("/api/user/bookmark/delete", body);
        console.log(data);
        if (data.success) {
          dispatch(deleteBookmark({ postId: post._id }));
          setIsBookmark(!isBookmark);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <PostWrapperDiv>
      <PostDiv>
        <div className="title">
          <div className="titleHeadline">
            <h5>{post.title}</h5>
            <button className="bookmarkBtn" onClick={bookmarkHandler}>
              {isBookmark ? (
                <FontAwesomeIcon icon={bookmarkSolid} />
              ) : (
                <FontAwesomeIcon icon={bookmarkRegular} />
              )}
            </button>
          </div>
        </div>
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
