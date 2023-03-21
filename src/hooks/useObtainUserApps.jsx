import { useQuery } from "@tanstack/react-query";
import { getApplicationsByUser } from "../useContentful";

//Function that calls Contentful logic
const fetchUserApps = async (loggedUser) => {
  const apps = await getApplicationsByUser(loggedUser);
  let userApps = [];
  // Employee role ID it will always be 1
  if (loggedUser[0].employee.employeeId === 1) {
    userApps = await apps.filter(
      //Returns every application that is from a employee
      (app) => app.employee.employeeId === loggedUser[0].employee.employeeId
    );
  } else {
    //Calls every application for an HR role
    userApps = apps;
  }

  return userApps;
};

//Function that manage the data from the API
const useFetchUserApps = (loggedUser) => {
  return useQuery(["apps", loggedUser], () => fetchUserApps(loggedUser));
};

export { useFetchUserApps };
