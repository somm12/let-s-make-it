import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../../firebase.js";
import { loginUser, clearUser } from "../../../Reducer/userSlice";
import axios from "axios";
import style from "./MyPage.module.scss";

const MyPage = () => {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState("");
  console.log(user, "유저유저");
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        let user = {
          displayName: userInfo.multiFactor.user.displayName,
          uid: userInfo.multiFactor.user.uid,
          accessToken: userInfo.multiFactor.user.accessToken,
          photoURL: userInfo.multiFactor.user.photoURL,
        };

        dispatch(loginUser(user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  useEffect(() => {
    setProfile(user.photoURL);
  }, [user]);

  const profileChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post("/api/user/profile/edit", formData).then((response) => {
      console.log(response.data);
      setProfile(response.data.filePath);
    });
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    let body = { photoURL: profile, uid: user.uid };

    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: profile,
      });
    } catch (error) {
      alert("프로필 변경에 실패했습니다");
      console.log(error);
    }

    try {
      const { data } = await axios.post("/api/user/profile/save", body);
      if (data.success) {
        alert("프로필이 변경 되었습니다");
        return;
      }
      alert("변경실패!");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <form className={style.form}>
        <label>
          <input
            onChange={profileChange}
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            className="shadow-none"
          />
          <img
            style={{ width: "200px", borderRadius: "50%", cursor: "pointer" }}
            src={profile}
            alt=""
          />
        </label>
        <button onClick={submitProfile}>저장</button>
      </form>
    </div>
  );
};

export default MyPage;
