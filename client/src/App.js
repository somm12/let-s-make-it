import React, { useState, useEffect } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Heading from "./Component/Heading";
import List from "./Component/Post/List";
import Upload from "./Component/Post/Upload";
import FetchPost from "./Component/Post/FetchPost";
import Edit from "./Component/Post/Edit";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";

import firebase from "./firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";

const App = () => {
  const [list, setList] = useState([]);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log(userInfo);
      // 현재 로그인한 유저의 정보.
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
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
        <Route path="/" element={<List list={list} />}></Route>
        <Route
          path="/upload"
          element={<Upload list={list} setList={setList} />}
        ></Route>
        <Route path="/post/:postNum" element={<FetchPost />}></Route>
        <Route path="/edit/:postNum" element={<Edit />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
};

export default App;
