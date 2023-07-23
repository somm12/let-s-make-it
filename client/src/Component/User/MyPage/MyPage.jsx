import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../../firebase.js";
import { loginUser, clearUser } from "../../../Reducer/userSlice";
import axios from "axios";
import style from "./MyPage.module.scss";

const MyPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setProfile(user.photoURL);
    setDisplayName(user.displayName);
  }, [user]);

  const profileChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const { data } = await axios.post("/api/user/profile/edit", formData);
      setProfile(data.filePath);
      setIsChange(true);
    } catch (e) {
      console.log(e);
    }
  };

  const displayNameChange = (e) => {
    setIsChange(true);
    setDisplayName(e.target.value);
  };
  const submitProfile = async (e) => {
    e.preventDefault();
    let body = { photoURL: profile, uid: user.uid, displayName };

    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: profile,
        displayName,
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
    <div className={style.myPageWrapper}>
      <table>
        <tbody className={style.form}>
          <tr className={style.photoChange}>
            <th>프로필 변경</th>
            <td>
              <label className={style.profileImageLabel}>
                <input
                  onChange={profileChange}
                  type="file"
                  accept="image/*"
                  className="shadow-none"
                />
                <img src={profile} alt="" />
              </label>
            </td>
          </tr>
          <tr className={style.displayNameChange}>
            <th>별명 변경</th>
            <td>
              <input
                type="text"
                onChange={displayNameChange}
                value={displayName}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button disabled={!isChange} onClick={submitProfile}>
        저장
      </button>
    </div>
  );
};

export default MyPage;
