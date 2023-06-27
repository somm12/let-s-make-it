import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGetComments } from "./commentAPI";
import CommentContent from "./CommentContent/CommentContent";

const List = ({ postId }) => {
  const [commentList, setCommentList] = useState([]);
  console.log(postId);
  const { data, isFetching } = useGetComments(postId);
  // setCommentList([...data?.data?.data?.commentList]);
  console.log(data?.data?.commentList);
  console.log(isFetching, "?");
  useEffect(() => {
    if (!isFetching) {
      setCommentList(data?.data?.commentList);
    }
  }, [isFetching]);

  // const fetchComments = async () => {
  //   let body = {
  //     postId,
  //   };
  //   try {
  //     const data = await axios.post("/api/comment/list", body);
  //     if (data.data.success) {
  //       console.log(data.data);
  //       setCommentList([...data.data.commentList]);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   fetchComments();
  // }, []);

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
