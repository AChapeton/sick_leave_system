import { useQuery } from "@tanstack/react-query";
import { deleteApplication } from "../useContentful";

//Function that calls Contentful logic
const deleteApp = async (row) => {
  deleteApplication(row.sysId);
  return null;
};

//Function that manage the data
const useDeleteApp = (row) => {
  return useQuery(["app", row], () => deleteApp(row));
};

export { useDeleteApp };
