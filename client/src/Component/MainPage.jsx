import React, { useState, useEffect, useRef, useCallback } from "react";
import List from "./Post/PostList/PostList";
import axios from "axios";
import FindContainerDiv from "../Style/MainPageCSS.js";
import Dropdown from "react-bootstrap/Dropdown";

import DropdownButton from "react-bootstrap/DropdownButton";
const MainPage = () => {
  const [postList, setPostList] = useState([]);
  const [sort, setSort] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const preventRef = useRef(true); //중복 실행 방지
  const obsRef = useRef(null); //observer Element
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    console.log("머야");
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 }); // 50% 가 보이면 로드하기.
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getPostLoadMore();
  }, [page, sort]);

  const obsHandler = (entries) => {
    const target = entries[0];

    if (!endRef.current && target.isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지

      preventRef.current = false; //옵저버 중복 실행 방지
      setPage((prev) => prev + 1); //페이지 값 증가
    }
  };

  const getPostLoadMore = useCallback(async () => {
    let body = {
      sort,
      searchTerm,
      page,
    };

    try {
      const { data } = await axios.post("/api/post/list", body);
      if (data.success) {
        // setSkip(skip + data.postList.length);

        preventRef.current = true;
        if (page === 1) {
          setPostList([...data.postList]);
          endRef.current = false;
        } else setPostList((prev) => [...prev, ...data.postList]);

        if (data.postList.length < 9) endRef.current = true;
      }
    } catch (e) {
      console.log(e);
    }
  }, [page, sort, searchTerm]);

  const searchHandler = (e) => {
    if (e.keyCode === 13) {
      // enter 누르면 post API 요청.
      if (page === 1) {
        getPostLoadMore();
      } // 검색을 했지만, 이미 현재 페이지가 첫페이지라면, 호출
      else setPage(1); // 첫 페이지로 상태변경을 함으로써, getPostLoadMore함수가 자동으로 페이지를 불러온다.
    }
  };

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
          <Dropdown.Item
            onClick={() => {
              setSort("최신순");
              setPage(1);
            }}
          >
            최신순
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setSort("인기순");
              setPage(1);
            }}
          >
            인기순
          </Dropdown.Item>
        </DropdownButton>
      </FindContainerDiv>

      <List postList={postList} />
      {/* {loadMore && <button onClick={getPostLoadMore}>더 불러오기</button>} */}
      <div ref={obsRef}>옵저버</div>
    </div>
  );
};

export default MainPage;
