import React from "react";

import axios from "axios";
const ImageUpload = ({ setImage }) => {
  const fileUpload = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/api/post/image/upload", formData).then((response) => {
      console.log(response.data);
      setImage(response.data.filePath);
    });
    // 서버로 파일 정보 보내기, 이미지 경로를 client로 전송, post model에 이미지 경로 저장.
  };
  return (
    <div>
      <input
        onChange={fileUpload}
        type="file"
        accept="image/*"
        className="shadow-none"
      />
    </div>
  );
};

export default ImageUpload;
