import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useEditComment, useDeleteComment } from "../../../Hooks/commentAPI";
import style from "./CommentContent.module.scss";
import moment from "moment";
import "moment/locale/ko";

const CommentContent = ({ comment }) => {
  const user = useSelector((state) => state.user);
  const ref = useRef();
  const [modalFlag, setModalFlag] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const updatedTime = (created, updated) => {
    if (created === updated)
      return moment(created).format("YYYY년 MMMM Do a hh:mm ");
    return moment(updated).format("YYYY년 MMMM Do a hh:mm (수정됨)");
  };
  // 수정요청 mutate 반환.
  const { mutateAsync: editMutateAsync } = useEditComment(
    comment.postId,
    user.uid,
    newComment,
    comment._id
  );
  // 삭제 요청 mutate 반환.
  const { mutateAsync: deleteMutateAsync } = useDeleteComment(
    comment.postId,
    user.uid,
    comment._id
  );

  const modalCloseHandler = ({ target }) => {
    // 모달이 열려있고, ref 영역이 아닌 영역클릭시, 모달 닫기.
    if (modalFlag && !ref.current.contains(target)) setModalFlag(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", modalCloseHandler);

    // Cleanup the event listener, unmount 될 때, evenListener 제거해주기.
    return () => {
      document.removeEventListener("mousedown", modalCloseHandler);
    };
  }, [modalFlag]);

  const submitEditHandler = async (e) => {
    e.preventDefault();
    if (!newComment) {
      alert("댓글을 작성해주세요!");
    }

    try {
      const {
        data: { success },
      } = await editMutateAsync();
      if (success) {
        setNewComment("");
        setEditFlag(false);
        alert("댓글 수정이 완료되었습니다!");
      }
    } catch (error) {
      alert("댓글 수정에 실패했습니다!");
    }
  };

  const commentDeleteHandler = async (e) => {
    e.preventDefault();
    if (window.confirm("정말로 삭제하시겠습니까? ")) {
      try {
        const {
          data: { success },
        } = await deleteMutateAsync();

        if (success) {
          setModalFlag(false);
          alert("댓글이 삭제되었습니다!");
        }
      } catch (error) {
        alert("댓글 삭제에 실패했습니다!");
      }
    }
  };

  return (
    <div>
      <div className={style.commentBox}>
        <div className={style.commentContent}>
          <div className={style.profile}>
            <img src={comment.author.photoURL} alt="" />
            <h5>{comment.author.displayName}</h5>
          </div>
          <p>{updatedTime(comment.createdAt, comment.updatedAt)}</p>

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
          <div>
            <h3 onClick={() => setModalFlag(true)}>...</h3>
            {modalFlag && (
              <div ref={ref}>
                <p
                  onClick={() => {
                    setEditFlag(true);
                    setModalFlag(false);
                  }}
                >
                  수정
                </p>
                <p onClick={commentDeleteHandler}>삭제</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentContent;
