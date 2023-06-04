import React, { useState } from "react";

import LoginDiv from "../../Style/UserCSS.js";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");

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
        <button>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
