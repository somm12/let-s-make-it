import React from "react";
import style from "./ImageEdit.module.scss";
import axios from "axios";
const ImageEdit = ({ image, setImage }) => {
  const fileUpload = (e) => {
    console.log(image, "AFSAFDSdsafafsd");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/api/post/image/upload", formData).then((response) => {
      console.log(response.data);
      setImage(response.data.filePath);
    });
    // 서버로 파일 정보 보내기, 이미지 경로를 client로 전송, post model에 이미지 경로 저장.
  };
  return (
    <div className={style.imageEditWrapper}>
      <input
        onChange={fileUpload}
        type="file"
        accept="image/*"
        className="shadow-none"
      />
      <img src={`${image}`} alt="" />
    </div>
  );
};

export default ImageEdit;