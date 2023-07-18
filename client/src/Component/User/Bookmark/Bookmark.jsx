import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PostList from "../../Post/PostList/PostList";
import axios from "axios";
import style from "./Bookmark.module.scss";
const Bookmark = () => {
  const user = useSelector((state) => state.user);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const getBookmarkedPosts = async () => {
    let body = {
      uid: user.uid,
    };
    try {
      const { data } = await axios.post("/api/post/bookmark/post", body);
      if (data.success) {
        setBookmarkedPosts(data.bookmarkPost);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(bookmarkedPosts, "북마크된 포스트");
  useEffect(() => {
    getBookmarkedPosts();
  }, []);
  return (
    <div className={style.bookmarkPost}>
      <h4 className={style.subtitle}>즐겨찾기한 레시피👩‍🍳</h4>
      {bookmarkedPosts && <PostList postList={bookmarkedPosts} />}
    </div>
  );
};

export default Bookmark;
