import React from "react";
import CommentList from "../CommentList";
import CommentUpload from "../CommentUpload/CommentUpload";
import { useSelector } from "react-redux";
import style from "./CommentWrapper.module.scss";
const CommentWrapper = ({ postId }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className={style.CommentWrapper}>
      {user.accessToken && <CommentUpload postId={postId} />}

      <CommentList postId={postId} />
    </div>
  );
};

export default CommentWrapper;
