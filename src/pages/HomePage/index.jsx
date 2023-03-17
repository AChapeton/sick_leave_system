import React from "react";
import { useLogin } from "../../hooks/store";

const HomePage = () => {
  const loggedUser = useLogin((state) => state.loggedUser);
  return (
    <div>
      <p>{loggedUser[0].username}</p>
    </div>
  );
};

export { HomePage };
