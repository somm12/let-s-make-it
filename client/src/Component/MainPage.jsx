import React, { useState, useEffect } from "react";
import List from "./Post/List";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const MainPage = () => {
  const [postList, setPostList] = useState([]);
  const [sort, setSort] = useState("최신순");
  useEffect(() => {
    let body = {
      sort,
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
  }, [sort]);
  return (
    <div>
      <DropdownButton title={sort}>
        <Dropdown.Item onClick={() => setSort("최신순")}>최신순</Dropdown.Item>
        <Dropdown.Item onClick={() => setSort("인기순")}>인기순</Dropdown.Item>
      </DropdownButton>
      <input type="text" />
      <List postList={postList} />
    </div>
  );
};

export default MainPage;
