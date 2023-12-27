import React, { useState } from "react";
import firebase from "../../firebase.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginUser, clearUser } from "../../Reducer/userSlice";
import style from "./Login/Login.module.scss";
const Register = () => {
  const dispatch = useDispatch();
  const intialPhotoURL =
    "https://kr.object.ncloudstorage.com/letsmakeit/user/92190016.JPG";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [flag, setFlag] = useState(false); // 유저가 회원가입 버튼을 계속 누를 경우 대비.

  const [nameCheck, setNameCheck] = useState(false);
  const [nameCheckMsg, setNameCheckMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  const signUp = async (e) => {
    let createdUser;
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

    try {
      createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // 기본 프로필 이미지 할당.
      await createdUser.user.updateProfile({
        displayName: name,
        photoURL: intialPhotoURL,
      });

      let temp = {
        displayName: name,
        uid: createdUser.user.multiFactor.user.uid,
        accessToken: createdUser.user.multiFactor.user.accessToken,
        photoURL: intialPhotoURL,
      };

      dispatch(loginUser(temp));
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found" || "auth/wrong-password":
          setErrorMsg("이메일 혹은 비밀번호가 일치하지 않습니다.");
          break;
        case "auth/email-already-in-use":
          setErrorMsg("이미 사용 중인 이메일입니다.");
          break;
        case "auth/weak-password":
          setErrorMsg("비밀번호는 6글자 이상이어야 합니다.");
          break;
        case "auth/network-request-failed":
          setErrorMsg("네트워크 연결에 실패 하였습니다.");
          break;
        case "auth/invalid-email":
          setErrorMsg("잘못된 이메일 형식입니다.");
          break;
        case "auth/internal-error":
          setErrorMsg("잘못된 요청입니다.");
          break;
        default:
          setErrorMsg("로그인에 실패 하였습니다.");
      }
    }
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      photoURL: intialPhotoURL,
      returnSecureToken: true,
    };

    try {
      await axios.post("/api/user/signUp", body);
      setFlag(false);
      navigate("/");
    } catch (e) {
      console.log(e);
      return alert("회원가입이 실패했습니다");
    }
  };

  // 닉네임 중복 검사
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
    <div className={style.loginWrapper}>
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
        <button onClick={signUp}>회원가입</button>
        {errorMsg !== "" && <p>{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Register;
