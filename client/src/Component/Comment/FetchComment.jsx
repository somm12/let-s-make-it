import React from "react";
import List from "./List";
import Upload from "./Upload";
import { useSelector } from "react-redux";
const FetchComment = ({ postId }) => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {user.accessToken && <Upload postId={postId} />}

      <List postId={postId} />
    </div>
  );
};

export default FetchComment;
