import React from "react";
import { useLogin } from "../../hooks/store";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const loggedUser = useLogin((state) => state.loggedUser);
  const loggedOut = useLogin((state) => state.loggedOut);

  const onHandleLogout = () => {
    loggedOut();
    navigate("/");
  };

  return (
    <div>
      <div>
        {loggedUser[0].employee.fullName}
        <p>Edit profile</p>
      </div>

      <div>
        <span>Username:</span>
        <span>{loggedUser[0].username}</span>
      </div>
      <div>
        <span>Employee number:</span>
        <span>{loggedUser[0].employee.sysId}</span>
      </div>
      <div>
        <span>Company start date:</span>
        <span>{loggedUser[0].employee.startDate}</span>
      </div>
      <div>
        <span>Position:</span>
        <span>{loggedUser[0].employee.position}</span>
      </div>
      <div>
        <span>ID Number:</span>
        <span>{loggedUser[0].userId}</span>
      </div>
      <div>
        <button onClick={() => onHandleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export { ProfilePage };
