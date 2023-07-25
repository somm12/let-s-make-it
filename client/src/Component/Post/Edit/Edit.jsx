import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageEdit from "../ImageEdit/ImageEdit";

import style from "./Edit.module.scss";
import axios from "axios";
const Edit = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState([]);
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");

  const onChangeContent = (e) => {
    const {
      target: { value },
    } = e;
    setContent(value);
  };
  const onChangeText = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  const onChangeIngredients = (e) => {
    const {
      target: { value },
    } = e;
    setIngredients(value);
  };

  const onSubmitPost = async (e) => {
    e.preventDefault();
    if (content === "" || title === "" || ingredients === "") {
      alert("제목 내용 재료 모두 입력해주세요");
      return;
    }

    const body = { title, content, postNum: post.postNum, image, ingredients };

    try {
      const { data } = await axios.post("/api/post/edit", body);
      if (data.success) {
        alert("성공적으로 수정에 성공했습니다");
        navigate(`/post/${post.postNum}`);
        return;
      }
      alert("수정 실패!");
    } catch (e) {
      console.log(e);
    }
  };

  const getPostDetail = async () => {
    let body = {
      postNum: params.postNum,
    };

    try {
      const { data } = await axios.post("/api/post/detail", body);
      if (data.success) {
        setPost(data.post);
        setContent(data.post.content);
        setTitle(data.post.title);
        setImage(data.post.image);
        setIngredients(data.post.ingredients);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPostDetail(); // 포스트 정보 들고오기.
  }, []);

  const onCancel = (e) => {
    e.preventDefault();
    navigate(-1); //뒤로가기.
  };

  return (
    <div className={style.uploadWrapper}>
      <form className={style.uploadForm}>
        <label htmlFor="label">제목</label>
        <input id="title" value={title} onChange={onChangeText} />
        <ImageEdit image={image} setImage={setImage} />

        <label htmlFor="ingredients">재료</label>
        <textarea
          className={style.ingredientsTextarea}
          id="ingredients"
          value={ingredients}
          onChange={onChangeIngredients}
        />
        <label htmlFor="content">내용</label>
        <textarea id="content" value={content} onChange={onChangeContent} />

        <div className={style.uploadButton}>
          <button className={style.cancel} onClick={onCancel}>
            취소
          </button>
          <button onClick={onSubmitPost}>제출</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
