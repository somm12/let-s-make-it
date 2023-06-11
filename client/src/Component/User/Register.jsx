import React, { useState } from "react";
import firebase from "../../firebase.js";
import LoginDiv from "../../Style/UserCSS.js";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");

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
