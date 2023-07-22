import React, { useEffect, useState } from "react";
import { useGetComments } from "./commentAPI";
import CommentContent from "./CommentContent/CommentContent";

const List = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);
  console.log(postId);
  const { data, isFetching } = useGetComments(postId);

  useEffect(() => {
    if (!isFetching) {
      setCommentList(data?.data?.commentList);
    }
  }, [isFetching]);

  return (
    <div>
      {commentList !== undefined ? (
        commentList.map((comment, idx) => (
          <CommentContent comment={comment} key={idx} />
        ))
      ) : (
        <div>empty</div>
      )}
    </div>
  );
};

export default List;
