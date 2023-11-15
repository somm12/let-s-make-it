import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import firebase from "../../firebase";

import style from "./Header.module.scss";

const Heading = () => {
  const user = useSelector((state) => state.user);
  const [toggleBtn, setToggleBtn] = useState(true);
  const navigate = useNavigate();
  const logOut = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <div className={style.headerWrapper}>
      <div className={style.logoWrapper}>
        <a className={style.serviceName} href="/">
          Let's Make It!
        </a>

        <FontAwesomeIcon
          onClick={() => {
            setToggleBtn(!toggleBtn);
          }}
          icon={faBars}
        />
      </div>
      {toggleBtn && (
        <nav>
          <header>
            <div className={style.userNavbar}>
              <Link className={style.mainMenu} to="/upload">
                Upload
              </Link>
              <Link className={style.mainMenu} to="/">
                Home
              </Link>

              {user.accessToken ? (
                <>
                  <Link className={style.userMenu} to="/mypage">
                    MyPage
                  </Link>
                  <Link className={style.userMenu} to="/bookmark">
                    Bookmark
                  </Link>
                  <div className={style.userMenu} onClick={logOut}>
                    LogOut
                  </div>
                </>
              ) : (
                <Link className={style.userMenu} to="/login">
                  Login
                </Link>
              )}
            </div>
          </header>
        </nav>
      )}
    </div>
  );
};

export default Heading;
