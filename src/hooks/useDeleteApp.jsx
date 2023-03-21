//1. creo el custo hook, base
//2. mando a traer la logica para eliminar
//3. la combino con react query
//4. Mando a llamar de nuevo la data que ha quedado
//5. llamo al delete custom hook desde la tabla componente
import { useQuery } from "@tanstack/react-query";
import { deleteApplication } from "../useContentful";
import { useFetchUserApps } from "./useObtainUserApps";

const deleteApp = async (row) => {
  deleteApplication(row.sysId);
  return null;
};

const useDeleteApp = (row) => {
  return useQuery(["apps", row], () => deleteApp(row));
};

export { useDeleteApp };
