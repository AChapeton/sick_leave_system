import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/store";
import { useFetchUserApps } from "../../hooks/useObtainUserApps";
import { useSearch } from "../../hooks/useSearch";
import { columnsHR, columnsEmployee } from "./columns";
import DataTable from "react-data-table-component";
import styles from "./styles.module.scss";

const ApplicationsTable = () => {
  //Calls logged user data
  const loggedUser = useLogin((state) => state.loggedUser);
  //Calls custom hook that fetch applications
  const { data, isLoading, isError } = useFetchUserApps(loggedUser);
  console.log(data);

  const [, forceUpdate] = useState();

  useEffect(() => {
    setTimeout(() => {
      forceUpdate;
    }, 2000);
  }, []);

  //Local storage to save search input value
  const [searchValue, setSearchValue] = useState("");
  //Calls custom hook that looks for search input value
  const { search } = useSearch(searchValue, data);

  //Function that saves search value from input
  const handleSearch = (e) => {
    const searchedValue = e.target.value;
    setSearchValue(searchedValue);
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
        className={styles.application__input_search}
        placeholder="Search"
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
