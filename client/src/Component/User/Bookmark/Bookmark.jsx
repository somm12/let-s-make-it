import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import PostList from "../../Post/PostList/PostList";
import axios from "axios";
import style from "./Bookmark.module.scss";
const Bookmark = () => {
  const user = useSelector((state) => state.user);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  console.log(user, "?");
  // infinite scrolling
  const [page, setPage] = useState(1);
  const obsRef = useRef(null); //observer Element
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 }); // 50% 가 보이면 로드하기.
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getBookmarkedPosts();
  }, [page]);

  const obsHandler = (entries) => {
    const target = entries[0];

    if (!endRef.current && target.isIntersecting) {
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  const getBookmarkedPosts = useCallback(async () => {
    let body = {
      uid: user.uid,
      page,
    };
    try {
      const { data } = await axios.post("/api/post/bookmark/post", body);
      if (data.success) {
        setBookmarkedPosts((prev) => [...prev, ...data.bookmarkPost]);

        if (data.bookmarkPost.length < 9) endRef.current = true;
      }
    } catch (e) {
      console.log(e);
    }
  }, [page]);

  return (
    <div className={style.bookmarkPost}>
      <h4 className={style.subtitle}>즐겨찾기한 레시피👩‍🍳</h4>
      {bookmarkedPosts.length > 0 ? (
        <PostList postList={bookmarkedPosts} />
      ) : (
        <div className={style.noBookmarkWord}>
          즐겨찾기한 레시피가 없습니다🧐
        </div>
      )}
      <div className={style.observer} ref={obsRef}></div>
    </div>
  );
};

export default Bookmark;
