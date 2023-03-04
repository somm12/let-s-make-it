import React, { useState, useEffect } from "react";
import axios from "axios";

const List = ({ list }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    let body = {
      a: "hello",
    };
    axios
      .post("/api/test", body)
      .then(function (res) {
        setText(res.data.text);
        console.log(res);
      })
      .catch(function (error) {
        // 에러 핸들링
        alert("요청 실패");
        console.log(error);
      });
  }, []);
  return (
    <div>
      {text}
      {list.map((li, idx) => (
        <h1 key={idx}>내용 : {li}</h1>
      ))}
    </div>
  );
};

export default List;
