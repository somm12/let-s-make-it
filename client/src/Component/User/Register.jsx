import React, { useState } from "react";
import firebase from "../../firebase.js";
import LoginDiv from "../../Style/UserCSS.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [flag, setFlag] = useState(false); // 유저가 회원가입 버튼을 계속 누를 경우 대비.

  const [nameCheck, setNameCheck] = useState(false);
  const [nameCheckMsg, setNameCheckMsg] = useState("");

  let navigate = useNavigate();
  const signUp = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(name && email && password && PWConfirm)) {
      return alert("모든 값을 채워 주세요!");
    }
    if (password !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인 값이 다릅니다!");
    }
    if (!nameCheck) {
      return alert("닉네임 중복검사를 해주세요!");
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createdUser.user.updateProfile({
      displayName: name,
      photoURL:
        "https://kr.object.ncloudstorage.com/letsmakeit/user/92190016.JPG",
    });
    console.log(createdUser.user);
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      photoURL:
        "https://kr.object.ncloudstorage.com/letsmakeit/user/92190016.JPG",
      returnSecureToken: true,
    };

    try {
      await axios.post("/api/user/signUp", body);
      setFlag(false);
      navigate("/login");
    } catch (e) {
      console.log(e);
      return alert("회원가입이 실패했습니다");
    }
  };
  const nameCheckHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      return alert("닉네임을 입력해주세요!");
    }
    let body = {
      displayName: name,
    };
    try {
      const data = await axios.post("/api/user/nameCheck", body);
      if (data.data.success) {
        if (data.data.check) {
          setNameCheckMsg("사용 가능한 닉네임입니다.");
          setNameCheck(true);
        } else {
          setNameCheckMsg("중복된 닉네임입니다.");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <LoginDiv>
      <form>
        <label>닉네임</label>
        <input
          type="text"
          value={name}
          disabled={nameCheck}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <button onClick={nameCheckHandler}>닉네임 중복검사</button>
        <p>{nameCheckMsg}</p>
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>비밀번호</label>
        <input
          type="password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          minLength={8}
          value={PWConfirm}
          onChange={(e) => setPWConfirm(e.currentTarget.value)}
        />
        <button disabled={flag} onClick={signUp}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Register;
