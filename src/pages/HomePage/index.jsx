import React from "react";
import { useLogin } from "../../hooks/store";
import { ApplicationsTable } from "../../modules/ApplicationsTable";
import { NavLink, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const loggedUser = useLogin((state) => state.loggedUser);
  const loggedOut = useLogin((state) => state.loggedOut);

  const onHandleLogout = () => {
    loggedOut();
    navigate("/");
  };
  console.log("logged", loggedUser);
  return (
    <div>
      <p>{loggedUser[0].username}</p>
      <button onClick={onHandleLogout}>Log Out</button>
      <NavLink to="/new_application">New application</NavLink>
      <ApplicationsTable />
    </div>
  );
};

export { HomePage };
