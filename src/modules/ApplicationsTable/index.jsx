import React from "react";
import { useLogin } from "../../hooks/store";

const ApplicationsTable = () => {
  const loggedUser = useLogin((state) => state.loggedUser);

  return (
    <div>
      ApplicationsTable
      <p>{console.log(loggedUser)}</p>
      <button onClick={() => onObtainUserApps}>Obtain</button>
    </div>
  );
};

export { ApplicationsTable };
