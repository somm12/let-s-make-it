import React, { useState, useEffect } from "react";
import axios from "axios";

const List = ({ list }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <h1>list!</h1>
      {text}
      {list.map((li, idx) => (
        <h1 key={idx}>내용 : {li}</h1>
      ))}
    </div>
  );
};

export default List;
