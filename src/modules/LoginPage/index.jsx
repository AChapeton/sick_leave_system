import React from "react";
import { useLogin } from "../../hooks/store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContentful } from "../../useContentful";

const LoginPage = () => {
  const { getAllUsers } = useContentful();

  // const checkLogin = useLogin((state) => state.checkLogin);
  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (userData) => {
    const users = await getAllUsers();
    // console.log(users.items);
    // console.log(users.items[0].fields.username);
    // const validUser = users.items.fields.some((user) =>
    //   // user.username === userData.username &&
    //   // user.password === userData.password
    //   console.log(user)
    // );
    const validUser = users.items.some(
      (user) =>
        user.fields.username === userData.username &&
        user.fields.password === userData.password
    );
    console.log(validUser);
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
