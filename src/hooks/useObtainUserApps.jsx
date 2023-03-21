import { useQuery } from "@tanstack/react-query";
import { getApplicationsByUser } from "../useContentful";

const fetchUserApps = async (loggedUser) => {
  const apps = await getApplicationsByUser(loggedUser);
  let userApps = [];
  // Employee role ID it will always be 1
  if (loggedUser[0].employee.employeeId === 1) {
    userApps = await apps.filter(
      (app) => app.employee.employeeId === loggedUser[0].employee.employeeId
    );
  } else {
    userApps = apps;
  }

  return userApps;
};

const useFetchUserApps = (loggedUser) => {
  return useQuery(["apps", loggedUser], () => fetchUserApps(loggedUser));
};

export { useFetchUserApps };
