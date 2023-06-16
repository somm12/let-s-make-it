import React, { useState } from "react";
import style from "../../Style/Comment/list.module.scss";
const CommentContent = ({ comment }) => {
  const [modalFlag, setModalFlag] = useState(false);
  return (
    <div>
      <div className={style.commentBox}>
        <div className={style.commentContent}>
          <h5>{comment.author.displayName}</h5>
          <h3>{comment.comment}</h3>
        </div>
        <div className={style.commentControl}>
          <h3 onClick={(e) => setModalFlag(true)}>...</h3>
          {modalFlag && (
            <div className={style.controlModal}>
              <p className={style.editText}>수정</p>
              <p className={style.deleteText}>삭제</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentContent;
