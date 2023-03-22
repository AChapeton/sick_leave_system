import React from "react";
import { useLogin } from "../../hooks/store";
import { ApplicationsTable } from "../../modules/ApplicationsTable";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import profileImg from "../../assets/photo.svg";
import logoutIcon from "../../assets/fi_log-out.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const loggedUser = useLogin((state) => state.loggedUser);
  const loggedOut = useLogin((state) => state.loggedOut);

  //Return to log in page
  const onHandleLogout = () => {
    //Erase logged user data
    loggedOut();
    navigate("/");
  };

  return (
    <div className={styles.home}>
      <div className={styles.home__header}>
        <div className={styles.home__header_profile}>
          <img src={profileImg} alt="Profile photo" />
          <div className={styles.home__actions}>
            <NavLink to="/profile">
              <h3>{loggedUser[0].username}</h3>
            </NavLink>
            <button onClick={onHandleLogout}>
              <img src={logoutIcon} alt="Log out icon" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
        <div>
          <NavLink to="/new_application">
            <button className={styles.home__button}>New application</button>
          </NavLink>
        </div>
      </div>
      <ApplicationsTable />
    </div>
  );
};

export { HomePage };
