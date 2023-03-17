import React, { useEffect, useState } from "react";
import { useSignin } from "../../hooks/store";
import { useNavigate, Navigate } from "react-router-dom";

const SignUpAsPage = () => {
  const navigate = useNavigate();
  const setRole = useSignin((state) => state.setRole);
  // const [roleValue, setRoleValue] = useState("");

  const onHandleRole = (role) => {
    setRole(role);
    navigate("/register");
  };

  return (
    <div>
      <p>Sign up as</p>
      <button onClick={() => onHandleRole("hr_specialist")}>
        I'm a HR specialist
      </button>
      <button onClick={() => onHandleRole("employee")}>I'm an employee</button>
    </div>
  );
};

export { SignUpAsPage };
