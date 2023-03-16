import React from "react";
import { useLogin } from "../../hooks/store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContentful } from "../../useContentful";

const LoginPage = () => {
  const { getAllEmployees } = useContentful();

  const fetchEmployees = async () => {
    const employees = await getAllEmployees();
    console.log("List of employees", employees);
  };

  // const checkLogin = useLogin((state) => state.checkLogin);
  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (userData) => {
    const validUser = users.some(
      (user) =>
        user.username === userData.username &&
        user.password === userData.password
    );
    reset();
    validateUser(validUser);
  };

  const validateUser = (validUser) => {
    if (validUser) {
      console.log("Welcome");
      navigate("/home");
    } else {
      console.log("Keep trying");
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <button onClick={fetchEmployees}>Employees</button>
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
        Don't have an account? <span>Sign in</span>
      </p>
    </div>
  );
};

export { LoginPage };
