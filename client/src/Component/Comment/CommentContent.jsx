import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useEditComment } from "./commentAPI";
import style from "../../Style/Comment/list.module.scss";
const CommentContent = ({ comment }) => {
  const user = useSelector((state) => state.user);
  const ref = useRef();
  const [modalFlag, setModalFlag] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editFlag, setEditFlag] = useState(false);

  const { mutate, isSuccess } = useEditComment(
    comment.postId,
    user.uid,
    newComment,
    comment._id
  );

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

  useEffect(() => {
    if (isSuccess) {
      alert("댓글 수정 완료가 되었습니다!!");
      setNewComment("");
      setEditFlag(false);
    }
  }, [isSuccess]);

  const submitEditHandler = (e) => {
    e.preventDefault();
    if (!newComment) {
      alert("댓글을 작성해주세요!");
    }
    mutate();
  };

  return (
    <div>
      <div className={style.commentBox}>
        <div className={style.commentContent}>
          <h5>{comment.author.displayName}</h5>
          {editFlag ? (
            <div>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.currentTarget.value)}
              />
              <button onClick={submitEditHandler}>등록</button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditFlag(false);
                }}
              >
                취소
              </button>
            </div>
          ) : (
            <h3>{comment.comment}</h3>
          )}
        </div>
        {user.uid === comment.author.uid && (
          <div className={style.commentControl}>
            <h3 onClick={() => setModalFlag(true)}>...</h3>
            {modalFlag && (
              <div className={style.controlModal} ref={ref}>
                <p
                  onClick={() => {
                    setEditFlag(true);
                    setModalFlag(false);
                  }}
                  className={style.editText}
                >
                  수정
                </p>
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
