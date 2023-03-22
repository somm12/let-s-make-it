import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Heading from "./Component/Heading";
import List from "./Component/Post/List";
import Upload from "./Component/Post/Upload";
import Detail from "./Component/Post/Detail";

const App = () => {
  const [list, setList] = useState([]);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List list={list} />}></Route>
        <Route
          path="/upload"
          element={<Upload list={list} setList={setList} />}
        ></Route>
        <Route path="/post/:postNum" element={<Detail />}></Route>
      </Routes>
    </>
  );
};

export default App;
