import React from "react";
import { useLogin } from "../../hooks/store";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../../useContentful";
import { NavLink } from "react-router-dom";
import itoLogo from "../../assets/itoLogo.svg";
import styles from "./styles.module.scss";

const LoginPage = () => {
  const saveLoggedUser = useLogin((state) => state.saveLoggedUser);
  const loggedUser = useLogin((state) => state.loggedUser);
  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (userData) => {
    //Evaluates if user credentials already exists
    const user = await login(userData.username, userData.password);
    if (user) {
      saveLoggedUser(user);
      navigate("/home");
    } else {
      reset();
    }
  };

  return (
    <div className={styles.login}>
      <img src={itoLogo} alt="ITO Focus Services Logo" />
      <h3 className={styles.login__title}>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          className={styles.login__input}
          {...register("username", { required: true })}
        />
        {errors.username?.type === "required" && <p>Username is required</p>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          className={styles.login__input}
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && <p>Password is required</p>}
        <span className={styles.login__span_link}>Forgot password?</span>
        <button className={styles.login__button}>Log in</button>
      </form>
      <div className={styles.login__span}>
        <NavLink to="/register_as">
          <p>
            Don't have an account?
            <span className={styles.login__span_link}> Sign in</span>
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export { LoginPage };
