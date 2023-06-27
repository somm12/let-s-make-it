import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase.js";
import { loginUser, clearUser } from "../../Reducer/userSlice";
import axios from "axios";
const MyPage = () => {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState("");
  console.log(user, "유저유저");
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
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

    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: profile,
      });
    } catch (error) {
      alert("프로필 변경에 실패했습니다");
      console.log(error);
    }

    let body = { photoURL: profile, uid: user.uid };
    axios
      .post("/api/user/profile/save", body)
      .then((res) => {
        if (res.data.success) {
          alert("프로필이 변경 되었습니다");
          //   window.location.reload();
          return;
        }
        alert("변경 실패!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
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
