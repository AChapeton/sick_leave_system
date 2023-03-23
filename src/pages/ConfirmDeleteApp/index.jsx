import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteApplication } from "../../useContentful";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import successIcon from "../../assets/fi_check-circle.svg";

const CustomSuccessDeletedToast = ({ closeToast }) => {
  return (
    <div className="toast_success">
      <img src={successIcon} alt="Success Icon" />
      <span>Application deleted successfully!</span>
    </div>
  );
};

const ConfirmDeleteApp = () => {
  const location = useLocation();
  const app = location.state;
  const navigate = useNavigate();

  const notify = () => {
    toast(<CustomSuccessDeletedToast />, {
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
    });
  };

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //Cancel delete option
  const onHandleCancel = () => {
    navigate("/home");
  };

  //Calls delete contentful function
  const onSubmit = async () => {
    await notify();
    await deleteApplication(app.sysId);
    navigate("/home", { replace: true });
  };

  return (
    <div className={styles.confirm}>
      <ToastContainer />
      <h3 className={styles.confirm__title}>
        Are you sure do you want to delete this app?
      </h3>
      <div className={styles.confirm__body}>
        <div className={styles.confirm__container}>
          <span className={styles.confirm__label}>Medical Unit:</span>
          <span className={styles.confirm__text}>{app.medicalUnit}</span>
        </div>
        <div className={styles.confirm__container}>
          <span className={styles.confirm__label}>Doctor:</span>
          <span className={styles.confirm__text}>{app.doctorName}</span>
        </div>
        <div className={styles.confirm__container}>
          <span className={styles.confirm__label}>Name:</span>
          <span className={styles.confirm__text}>{app.employee.fullName}</span>
        </div>
        <div className={styles.confirm__container}>
          <span className={styles.confirm__label}>Start Date:</span>
          <span className={styles.confirm__text}>
            {format(new Date(app.startDate), "MM/dd/yyyy")}
          </span>
        </div>
        <div className={styles.confirm__container}>
          <span className={styles.confirm__label}>End Date:</span>
          <span className={styles.confirm__text}>
            {format(new Date(app.endDate), "MM/dd/yyyy")}
          </span>
        </div>
        <div className={styles.confirm__container}>
          <span className={styles.confirm__label}>Medical Diagnostic:</span>
          <span className={styles.confirm__text}>{app.medicalDiagnostic}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.confirm__form}>
        <button className={styles.confirm__button}>Confirm</button>
      </form>
      <button className={styles.confirm__cancel} onClick={onHandleCancel}>
        Cancel
      </button>
    </div>
  );
};

export { ConfirmDeleteApp };
