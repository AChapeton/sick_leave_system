import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDeleteApp } from "../../hooks/useDeleteApp";
import { deleteApplication } from "../../useContentful";
import { useLogin } from "../../hooks/store";
import { useForm } from "react-hook-form";

const ConfirmDeleteApp = () => {
  const location = useLocation();
  const app = location.state;
  const navigate = useNavigate();
  const loggedUser = useLogin((state) => state.loggedUser);
  console.log(app);

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onHandleCancel = () => {
    navigate("/home");
  };

  const onSubmit = () => {
    // useDeleteApp(app);
    deleteApplication(app.sysId);
    navigate("/home");
    // <Navigate to="/home" />;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Are you sure do you want to delete this app?</p>
        <button>Confirm</button>
      </form>
      <button onClick={onHandleCancel}>Cancel</button>
    </div>
  );
};

export { ConfirmDeleteApp };
