import React, { useState, useEffect } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Heading from "./Component/Header/Header";
import Upload from "./Component/Post/Upload";
import FetchPost from "./Component/Post/FetchPost";
import Edit from "./Component/Post/Edit/Edit";
import Login from "./Component/User/Login/Login";
import Register from "./Component/User/Register";
import MyPage from "./Component/User/MyPage/MyPage";
import Bookmark from "./Component/User/Bookmark/Bookmark";
import MainPage from "./Component/MainPage/MainPage";

import firebase from "./firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser, setBookmark } from "./Reducer/userSlice";
import axios from "axios";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const getUserBookmark = async (uid) => {
    let body = {
      uid,
    };
    try {
      const { data } = await axios.post("/api/post/bookmark/postId", body);
      console.log(data.bookmark, "북마크 가져오기.!!!!");
      dispatch(setBookmark({ bookmark: data.bookmark })); // id 형태로 넣어줘야함.
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log(userInfo, "유저");
      // 현재 로그인한 유저의 정보.
      if (userInfo !== null) {
        let user = {
          displayName: userInfo.multiFactor.user.displayName,
          uid: userInfo.multiFactor.user.uid,
          accessToken: userInfo.multiFactor.user.accessToken,
          photoURL: userInfo.multiFactor.user.photoURL,
        };

        dispatch(loginUser(user));
        getUserBookmark(userInfo.multiFactor.user.uid);
      } else {
        // 현재 유저 정보가 없다면, 로그인 상태가 아니므로, user store를 비운다.
        dispatch(clearUser());
      }
    });
  }, []);

  return (
    <>
      <Heading />

      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/post/:postNum" element={<FetchPost />}></Route>
        <Route path="/edit/:postNum" element={<Edit />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/bookmark" element={<Bookmark />}></Route>
      </Routes>
    </>
  );
};

export default App;
