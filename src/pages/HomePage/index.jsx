import React from "react";
import { useLogin } from "../../hooks/store";
import { ApplicationsTable } from "../../modules/ApplicationsTable";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const loggedUser = useLogin((state) => state.loggedUser);
  return (
    <div>
      <p>{loggedUser[0].username}</p>
      <NavLink to="/new_application">New application</NavLink>
      <ApplicationsTable />
    </div>
  );
};

export { HomePage };
