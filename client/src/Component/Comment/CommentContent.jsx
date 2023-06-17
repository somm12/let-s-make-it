import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import style from "../../Style/Comment/list.module.scss";
const CommentContent = ({ comment }) => {
  const user = useSelector((state) => state.user);
  const ref = useRef();
  const [modalFlag, setModalFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const modalCloseHandler = ({ target }) => {
    // 모달이 열려있고, ref 영역이 아닌 영역클릭시, 모달 닫기.
    if (modalFlag && !ref.current.contains(target)) setModalFlag(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", modalCloseHandler);
    console.log("Afadfaadf");
    // Cleanup the event listener, unmount 될 때, evenListener 제거해주기.
    return () => {
      document.removeEventListener("mousedown", modalCloseHandler);
    };
  }, [modalFlag]);

  return (
    <div>
      <div className={style.commentBox}>
        <div className={style.commentContent}>
          <h5>{comment.author.displayName}</h5>
          <h3>{comment.comment}</h3>
        </div>
        {user.uid === comment.author.uid && (
          <div className={style.commentControl}>
            <h3 onClick={() => setModalFlag(true)}>...</h3>
            {modalFlag && (
              <div className={style.controlModal} ref={ref}>
                <p className={style.editText}>수정</p>
                <p className={style.deleteText}>삭제</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentContent;
