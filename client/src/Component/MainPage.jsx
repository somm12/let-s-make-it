import React, { useState, useEffect } from "react";
import List from "./Post/List";
import axios from "axios";
import FindContainerDiv from "../Style/MainPageCSS.js";
import Dropdown from "react-bootstrap/Dropdown";

import DropdownButton from "react-bootstrap/DropdownButton";
const MainPage = () => {
  const [postList, setPostList] = useState([]);
  const [sort, setSort] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState("");

  const getPost = () => {
    let body = {
      sort,
      searchTerm,
    };
    axios
      .post("/api/post/list", body)
      .then((res) => {
        if (res.data.success) {
          setPostList([...res.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchHandler = (e) => {
    if (e.keyCode === 13) {
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
    </div>
  );
};

export default MainPage;
