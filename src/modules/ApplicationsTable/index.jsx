import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/store";
import { useFetchUserApps } from "../../hooks/useObtainUserApps";
import { columnsHR, columnsEmployee } from "./columns";
import DataTable from "react-data-table-component";

const ApplicationsTable = () => {
  //Calls logged user data
  const loggedUser = useLogin((state) => state.loggedUser);
  //Calls custom hook that fetch applications
  const { data, isLoading, isError } = useFetchUserApps(loggedUser);
  //Local storage to manage search input
  const [search, setSearch] = useState(data);

  //Saves data when component starts
  useEffect(() => {
    setSearch(data);
  }, []);

  //Updates data if data changes
  useEffect(() => {
    setSearch(data);
  }, [data]);

  //Function that receives a value from search input
  const handleSearch = (e) => {
    if (e.target.value) {
      const searchApps = data.filter((app) => {
        return (
          //Change everything to lower cases in order to the values may coincide
          app.doctorName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          app.medicalUnit
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          app.employee.fullName
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
      });
      //Saves searched data
      setSearch(searchApps);
    } else {
      //If search input is empty
      setSearch(data);
    }
  };

  //Waiting for data to be obtained
  if (isLoading) return <div>Loading...</div>;

  //If no data has been obtained
  if (isError) return <div>Error...</div>;

  return (
    <>
      <input
        type="text"
        name="searchValue"
        id="searchValue"
        onChange={handleSearch}
      />
      <DataTable
        columns={
          loggedUser[0].role === "employee" ? columnsEmployee : columnsHR
        }
        data={search}
        pagination
      />
    </>
  );
};

export { ApplicationsTable };
