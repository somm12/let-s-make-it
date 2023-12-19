import React, { useState, useEffect, useRef, useCallback } from "react";
import List from "../Post/PostList/PostList";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import style from "./MainPage.module.scss";

const MainPage = () => {
  const sortBtnRef = useRef();
  const [postList, setPostList] = useState([]);
  const [sort, setSort] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isSortBtnOpen, setIsSortBtnOpen] = useState(false);

  const obsRef = useRef(null); //observer Element
  const endRef = useRef(false); //모든 글 로드 확인

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 }); // 50% 가 보이면 로드하기.
    console.log(obsRef.current, "값 출력.");
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

    if (!endRef.current && target.isIntersecting) {
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

        if (page === 1) {
          // 검색을 한 경우, 다시 검색 결과 페이지의 첫페이지를 보여야하므로, 초기화.
          setPostList([...data.postList]);
          // endRef.current = false; // 검색 결과가 페이지 개수가 1개 밖에 없다면, endRef가 true가 되고, 그 이후 검색에서도 페이지가 여러 개여도 true가 되어서 (로딩이 안되어) false를 할당.
        } else setPostList((prev) => [...prev, ...data.postList]);

        if (data.postList.length < 8) endRef.current = true;
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

  const modalCloseHandler = ({ target }) => {
    // 모달이 열려있고, ref 영역이 아닌 영역클릭시, 모달 닫기.
    if (isSortBtnOpen && !sortBtnRef.current.contains(target))
      setIsSortBtnOpen(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", modalCloseHandler);

    // Cleanup the event listener, unmount 될 때, evenListener 제거해주기.
    return () => {
      document.removeEventListener("mousedown", modalCloseHandler);
    };
  }, [isSortBtnOpen]);
  return (
    <div className={style.mainWrapper}>
      <div className={style.finderContainer}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={searchHandler}
          placeholder="검색어를 입력하세요"
          type="text"
        />
      </div>

      <div className={style.dropdownButton} ref={sortBtnRef}>
        <button
          className={style.textButton}
          onClick={() => setIsSortBtnOpen(!isSortBtnOpen)}
        >
          {sort}
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
        <div
          className={isSortBtnOpen ? style.dropdownTrue : style.dropdownFalse}
        >
          <button
            onClick={() => {
              setSort("최신순");
              setPage(1);
              setIsSortBtnOpen(!isSortBtnOpen);
            }}
          >
            최신순
          </button>
          <button
            onClick={() => {
              setSort("인기순");
              setPage(1);
              setIsSortBtnOpen(!isSortBtnOpen);
            }}
          >
            인기순
          </button>
        </div>
      </div>
      <List postList={postList} />

      <div className={style.observer} ref={obsRef}></div>
    </div>
  );
};

export default MainPage;
