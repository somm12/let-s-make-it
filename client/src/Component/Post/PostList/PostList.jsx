import React from "react";
import { Link } from "react-router-dom";

import style from "./PostList.module.scss";

const PostList = ({ postList }) => {
  return (
    <div className={style.postListWrapper}>
      {postList.map((post, idx) => (
        <div className={style.eachPost} key={post._id}>
          <Link to={`/post/${post.postNum}`}>
            <div className={style.thumbNail}>
              {post.image && <img src={post.image} />}
              <h4>{post.title}</h4>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
