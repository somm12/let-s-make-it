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

  let navigate = useNavigate();
  const signUp = async (e) => {
    e.preventDefault();
    if (!(name && email && password && PWConfirm)) {
      return alert("모든 값을 채워 주세요!");
    }
    if (password !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인 값이 다릅니다!");
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await createdUser.user.updateProfile({
      displayName: name,
    });
    console.log(createdUser.user);
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };

    try {
      const data = await axios.post("api/user/signUp", body);
      console.log(data);
      navigate("/login");
    } catch (e) {
      console.log(e);
      return alert("회원가입이 실패했습니다");
    }
  };

  return (
    <LoginDiv>
      <form>
        <label>이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={PWConfirm}
          onChange={(e) => setPWConfirm(e.currentTarget.value)}
        />
        <button onClick={signUp}>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
