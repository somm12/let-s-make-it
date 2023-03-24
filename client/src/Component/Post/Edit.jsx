import React, { useState, useEffect } from "react";
import {
  UploadButtonDiv,
  UploadForm,
  UploadDiv,
} from "../../Style/UploadCSS.js";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const Edit = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState([]);
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
  const onSubmitPost = (e) => {
    e.preventDefault();
    if (content === "" || title === "") {
      alert("제목 내용 모두 입력해주세요");
      return;
    }
    const body = { title, content, postNum: post.postNum };
    console.log(body);
    axios
      .post("/api/post/edit", body)
      .then((res) => {
        if (res.data.success) {
          alert("성공적으로 수정에 성공했습니다");
          navigate(`/post/${post.postNum}`);
          return;
        }
        alert("수정 실패!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.post);
          setPost(res.data.post);
          setContent(res.data.post.content);
          setTitle(res.data.post.title);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="label">제목</label>
        <input id="title" value={title} onChange={onChangeText} />
        <label htmlFor="content">내용</label>
        <textarea id="content" value={content} onChange={onChangeContent} />
        <UploadButtonDiv>
          <button className="cancel" onClick={onCancel}>
            취소
          </button>
          <button onClick={onSubmitPost}>제출</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
};

export default Edit;
