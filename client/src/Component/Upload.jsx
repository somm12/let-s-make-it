import React, { useState, useEffect } from "react";

const Upload = ({ list, setList }) => {
  const [content, setContent] = useState("");
  console.log(list);
  const onChangeContent = (e) => {
    const {
      target: { value },
    } = e;
    console.log(value);
    setContent(value);
  };
  const onSubmitContent = () => {
    console.log(list);
    setList([...list, content]);
    setContent("");
  };
  useEffect(() => {
    // 컴포넌트가 나타날 때 실행될 코드
    return () => {
      // 컴포넌트가 죽을 때 실행될 코드
    };
  }, []);
  const [test, setTest] = useState(0);
  return (
    <div>
      <h1>Upload</h1>
      <input value={content} onChange={onChangeContent} />
      <button onClick={onSubmitContent}>제출</button>
    </div>
  );
};

export default Upload;
