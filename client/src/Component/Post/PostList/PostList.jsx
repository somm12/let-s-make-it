import React from "react";
import { Link } from "react-router-dom";
import { ListDiv } from "../../../Style/ListCSS.js";
import moment from "moment";
import "moment/locale/ko";
import style from "./PostList.module.scss";

const PostList = ({ postList }) => {
  // const updatedTime = (created, updated) => {
  //   // 글이 업로드 또는 수정된 시간 반환.
  //   if (created === updated)
  //     return moment(created).format("YYYY년 MMMM Do a hh:mm ");
  //   return moment(updated).format("YYYY년 MMMM Do a hh:mm (수정됨)");
  // };

  return (
    <div className={style.postListWrapper}>
      {postList.map((post, idx) => (
        <ListDiv className="eachPost" key={post._id}>
          <Link to={`/post/${post.postNum}`}>
            {/* <div>
              <img className="userProfile" src={post.author.photoURL} alt="" />
              {post.author.displayName}
            </div> */}
            <div className={style.thumbNail}>
              {post.image && <img src={post.image} />}
              <h4>{post.title}</h4>
            </div>

            {/* <h5>{post.content}</h5> */}
          </Link>
          {/* <div>
            <p>{updatedTime(post.createdAt, post.updatedAt)}</p>
          </div> */}
        </ListDiv>
      ))}
    </div>
  );
};

export default PostList;
