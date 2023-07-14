import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../Style/UserCSS.js";
import firebase from "../../firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearUser } from "../../Reducer/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      // 현재 로그인한 유저의 정보.

      if (userInfo !== null) {
        let user = {
          displayName: userInfo.multiFactor.user.displayName,
          uid: userInfo.multiFactor.user.uid,
          accessToken: userInfo.multiFactor.user.accessToken,
          photoURL: userInfo.multiFactor.user.photoURL,
        };
        console.log(user, "!");

        dispatch(loginUser(user));
      } else {
        // 현재 유저 정보가 없다면, 로그인 상태가 아니므로, user store를 비운다.
        dispatch(clearUser());
      }
    });
  }, []);

  const signIn = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return alert("이메일 비밀번호 모두 채워주세요!");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setErrorMsg("존재하지 않는 이메일입니다.");
      } else if ((err.code = "auth/wrong-password")) {
        setErrorMsg("비밀번호가 일치하지 않습니다");
      } else {
        setErrorMsg("로그인이 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    // 에러 메세지 출력 5초마다 다시 초기화
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  }, [errorMsg]);
  return (
    <LoginDiv>
      <form>
        <label>이메일</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label>비밀번호</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {errorMsg !== "" && <p>{errorMsg}</p>}
        <button onClick={signIn}>로그인</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Login;
