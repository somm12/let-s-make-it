import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Heading from "./Component/Heading";
import List from "./Component/List";
import Upload from "./Component/Upload";

const App = () => {
  const [list, setList] = useState([]);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/list" element={<List list={list} />}></Route>
        <Route
          path="/upload"
          element={<Upload list={list} setList={setList} />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
