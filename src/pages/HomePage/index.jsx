import React from "react";
import { useLogin } from "../../hooks/store";
import { ApplicationsTable } from "../../modules/ApplicationsTable";
import { NavLink, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const loggedUser = useLogin((state) => state.loggedUser);
  const loggedOut = useLogin((state) => state.loggedOut);

  //Return to log in page
  const onHandleLogout = () => {
    //Erase logged user data
    loggedOut();
    navigate("/");
  };

  return (
    <div>
      <NavLink to="/profile">{loggedUser[0].username}</NavLink>
      <button onClick={onHandleLogout}>Log Out</button>
      <NavLink to="/new_application">New application</NavLink>
      <ApplicationsTable />
    </div>
  );
};

export { HomePage };
