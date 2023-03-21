import React from "react";
import { useLogin } from "../../hooks/store";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
// import { useContentful } from "../../useContentful";
import { login } from "../../useContentful";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const saveLoggedUser = useLogin((state) => state.saveLoggedUser);
  const loggedUser = useLogin((state) => state.loggedUser);
  const navigate = useNavigate();

  console.log(loggedUser);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (userData) => {
    const user = await login(userData.username, userData.password);
    if (user) {
      console.log("Welcome");
      console.log("Loggued User", user);
      saveLoggedUser(user);
      navigate("/home");
      // <Navigate to="/home" />;
    } else {
      console.log("Keep trying");
      reset();
    }
  };

  // if (loggedUser) {
  //   return <Navigate to="/home" />;
  // }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          {...register("username", { required: true })}
        />
        {errors.username?.type === "required" && <p>Username is required</p>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && <p>Password is required</p>}
        <span>Forgot password?</span>
        <button>Log in</button>
      </form>
      <p>
        Don't have an account? <NavLink to="/register_as">Sign in</NavLink>
      </p>
    </div>
  );
};

export { LoginPage };
