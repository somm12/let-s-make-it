import React from "react";
import List from "./List";
import Upload from "./Upload";
const FetchComment = ({ postId }) => {
  return (
    <div>
      <Upload postId={postId} />
      <List />
    </div>
  );
};

export default FetchComment;
