import React, { useState, useEffect } from "react";
import List from "./Post/PostList/PostList";
import axios from "axios";
import FindContainerDiv from "../Style/MainPageCSS.js";
import Dropdown from "react-bootstrap/Dropdown";

import DropdownButton from "react-bootstrap/DropdownButton";
const MainPage = () => {
  const [postList, setPostList] = useState([]);
  const [sort, setSort] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState("");
  const [skip, setSkip] = useState(0);
  const [loadMore, setLoadMore] = useState(true); // 더 불러오기 버튼 비활성화.

  const getPostLoadMore = async () => {
    let body = {
      sort,
      searchTerm,
      skip,
    };
    try {
      const { data } = await axios.post("/api/post/list", body);
      if (data.success) {
        setSkip(skip + data.postList.length);
        setPostList([...postList, ...data.postList]);
        if (data.postList.length < 5) setLoadMore(false);
        else setLoadMore(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getPost = async () => {
    setSkip(0);
    let body = {
      sort,
      searchTerm,
      skip: 0,
    };

    try {
      const { data } = await axios.post("/api/post/list", body);
      if (data.success) {
        if (data.postList.length < 5) setLoadMore(false);
        else setLoadMore(true);
        setSkip(data.postList.length);
        setPostList([...data.postList]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const searchHandler = (e) => {
    if (e.keyCode === 13) {
      // enter 누르면 post API 요청.
      getPost();
    }
  };

  useEffect(() => {
    getPost();
  }, [sort]);

  return (
    <div>
      <FindContainerDiv>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={searchHandler}
          placeholder="검색어를 입력하세요"
          type="text"
        />

        <DropdownButton title={sort}>
          <Dropdown.Item onClick={() => setSort("최신순")}>
            최신순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("인기순")}>
            인기순
          </Dropdown.Item>
        </DropdownButton>
      </FindContainerDiv>

      <List postList={postList} />
      {loadMore && <button onClick={getPostLoadMore}>더 불러오기</button>}
    </div>
  );
};

export default MainPage;
