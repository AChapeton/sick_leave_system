import React from "react";
import { useLogin } from "../../hooks/store";
import { useNavigate, Navigate } from "react-router-dom";
import styles from "./styles.module.scss";
import profilePhoto from "../../assets/photo.svg";
import editIcon from "../../assets/fi_edit.svg";
import logoutIcon from "../../assets/fi_log-out.svg";
import { format } from "date-fns";

const ProfilePage = () => {
  const navigate = useNavigate();
  const loggedUser = useLogin((state) => state.loggedUser);
  const loggedOut = useLogin((state) => state.loggedOut);

  //Function to log out
  const onHandleLogout = () => {
    //Erase logged user data
    loggedOut();
    navigate("/");
  };

  //Function to return Home
  const onHandleReturn = () => {
    navigate("/home");
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        <img
          className={styles.profile__photo}
          src={profilePhoto}
          alt="Profile photo"
        />
        <h3 className={styles.profile__name}>
          {loggedUser[0].employee.fullName}
        </h3>
        <div className={styles.profile__editContainer}>
          <img src={editIcon} alt="Edit icon" />
          <span className={styles.profile__edit}>Edit profile</span>
        </div>
      </div>

      <div className={styles.profile__body}>
        <div className={styles.profile__container}>
          <span className={styles.profile__label}>Username:</span>
          <span className={styles.profile__text}>{loggedUser[0].username}</span>
        </div>
        <div className={styles.profile__container}>
          <span className={styles.profile__label}>Employee number:</span>
          <span className={styles.profile__text}>
            {loggedUser[0].employee.sysId}
          </span>
        </div>
        <div className={styles.profile__container}>
          <span className={styles.profile__label}>Company start date:</span>
          <span className={styles.profile__text}>
            {format(new Date(loggedUser[0].employee.startDate), "MM/dd/yyyy")}
          </span>
        </div>
        <div className={styles.profile__container}>
          <span className={styles.profile__label}>Position:</span>
          <span className={styles.profile__text}>
            {loggedUser[0].employee.position}
          </span>
        </div>
        <div className={styles.profile__container}>
          <span className={styles.profile__label}>ID Number:</span>
          <span className={styles.profile__text}>{loggedUser[0].userId}</span>
        </div>
        <div>
          <button className={styles.profile__logout} onClick={onHandleLogout}>
            <img src={logoutIcon} alt="Log out icon" />
            <span>Log Out</span>
          </button>
          <button className={styles.profile__button} onClick={onHandleReturn}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
