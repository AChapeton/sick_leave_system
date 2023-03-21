import { useQuery } from "@tanstack/react-query";
import { deleteApplication } from "../useContentful";

const deleteApp = async (row) => {
  deleteApplication(row.sysId);
  return null;
};

const useDeleteApp = (row) => {
  return useQuery(["apps", row], () => deleteApp(row));
};

export { useDeleteApp };
