import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListDiv } from "../../Style/ListCSS.js";
import moment from "moment";
import "moment/locale/ko";

const List = ({ postList }) => {
  const updatedTime = (created, updated) => {
    if (created === updated)
      return moment(created).format("YYYY년 MMMM Do a hh:mm ");
    return moment(updated).format("YYYY년 MMMM Do a hh:mm (수정됨)");
  };

  return (
    <div className="postListWrapper">
      {postList.map((post, idx) => (
        <ListDiv className="eachPost" key={post._id}>
          <Link to={`/post/${post.postNum}`}>
            <h4>{post.title}</h4>
            <div>
              <img className="userProfile" src={post.author.photoURL} alt="" />
              {post.author.displayName}
            </div>
            <h5>{post.content}</h5>
          </Link>
          <div>
            <p>{updatedTime(post.createdAt, post.updatedAt)}</p>
          </div>
        </ListDiv>
      ))}
    </div>
  );
};

export default List;
