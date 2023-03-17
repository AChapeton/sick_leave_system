import React from "react";
import { useLogin } from "../../hooks/store";
import { ApplicationsTable } from "../../modules/ApplicationsTable";

const HomePage = () => {
  const loggedUser = useLogin((state) => state.loggedUser);
  return (
    <div>
      <p>{loggedUser[0].username}</p>
      <ApplicationsTable />
    </div>
  );
};

export { HomePage };
