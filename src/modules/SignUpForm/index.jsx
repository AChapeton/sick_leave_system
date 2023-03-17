import React from "react";
import { useSignin } from "../../hooks/store";

const SignUpForm = () => {
  const chooseRol = useSignin((state) => state.chooseRol);

  return (
    <div>
      <form></form>
    </div>
  );
};

export { SignUpForm };
