import React, { useState } from "react";

const List = ({ list }) => {
  console.log(list);
  return (
    <div>
      {list.map((li, idx) => (
        <h1 key={idx}>내용 : {li}</h1>
      ))}
    </div>
  );
};

export default List;
