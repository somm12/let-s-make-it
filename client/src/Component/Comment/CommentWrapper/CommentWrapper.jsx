import React from "react";
import List from "../List";
import CommentUpload from "../CommentUpload/CommentUpload";
import { useSelector } from "react-redux";
import style from "./CommentWrapper.module.scss";
const CommentWrapper = ({ postId }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className={style.CommentWrapper}>
      {user.accessToken && <CommentUpload postId={postId} />}

      <List postId={postId} />
    </div>
  );
};

export default CommentWrapper;
