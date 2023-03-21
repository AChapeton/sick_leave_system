import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/store";
import { useFetchUserApps } from "../../hooks/useObtainUserApps";
import DataTable from "react-data-table-component";
import { parse, format } from "date-fns";
import { useNavigate, Navigate, NavLink } from "react-router-dom";
import { useDeleteApp } from "../../hooks/useDeleteApp";

const ApplicationsTable = () => {
  const loggedUser = useLogin((state) => state.loggedUser);
  const { data, isLoading, isError } = useFetchUserApps(loggedUser);
  let row = {};
  // const { newData, newIsLoading, newIsError } = useDeleteApp(row, loggedUser);
  const navigate = useNavigate();
  // const applications = useApplications((state) => state.applications);
  // const setApplications = useApplications((state) => state.setApplications);

  // let currentUserApps = [];
  const [currentUserApps, setCurrentUserApps] = useState([]);
  const [search, setSearch] = useState(data);

  // const formattedApplications = data.map((app) => {
  //   app, (app.startDate = format(new Date(app.startDate), "MM/dd/yyyy"));
  //   app.endDate = format(new Date(app.endDate), "MM/dd/yyyy");
  // });

  // useEffect(() => {
  //   onObtainUserApps();
  // }, []);

  // useEffect(() => {
  //   console.log("Something changed");
  //   onObtainUserApps();
  // }, []);

  // useEffect(() => {
  //   setSearch(data);
  //   console.log("useEffect", data);
  // }, [data]);

  console.log(data);

  const handleSearch = (e) => {
    if (e.target.value) {
      const searchApps = data.filter((app) => {
        return (
          app.doctorName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          app.medicalUnit
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          app.employee.fullName
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
      });
      setSearch(searchApps);
    } else {
      setSearch(data);
    }
  };

  const handleDelete = (row) => {
    // <NavLink to="/confirm_delete_app" state={row}>
    //   Delete
    // </NavLink>;
    // <Navigate to="confirm_delete_app" />;
    // setSearch(data);
    // row = rowData()
    // console.log("custom hook data table", newData);
    // <Navigate to="/home" />;
  };

  const columnsHR = [
    {
      name: "Employee",
      selector: (row) => row.employee.fullName,
    },
    {
      name: "Medical diagnostic",
      selector: (row) => row.medicalDiagnostic,
    },
    {
      name: "Application date",
      // selector: (row) => row.startDate,
      selector: (row) => format(new Date(row.startDate), "MM/dd/yyyy"),
    },
    {
      name: "Medical unit",
      selector: (row) => row.medicalUnit,
    },
    {
      name: "Doctor",
      selector: (row) => row.doctorName,
    },
    {
      name: "Days of coverage",
      selector: (row) => row.coverageDays,
    },
    {
      name: "Start date",
      // selector: (row) => row.startDate,
      selector: (row) => format(new Date(row.startDate), "MM/dd/yyyy"),
    },
    {
      name: "End date",
      // selector: (row) => row.endDate,
      selector: (row) => format(new Date(row.endDate), "MM/dd/yyyy"),
    },
    {
      name: "Actions",
      selector: (row) => (
        // <button onClick={() => handleDelete(row)}>Delete</button>
        <NavLink to="/confirm_delete_app" state={row}>
          Delete
        </NavLink>
      ),
    },
  ];

  const columnsEmployee = [
    {
      name: "Medical diagnostic",
      selector: (row) => row.medicalDiagnostic,
    },
    {
      name: "Application date",
      // selector: (row) => row.startDate,
      selector: (row) => format(new Date(row.startDate), "MM/dd/yyyy"),
    },
    {
      name: "Medical unit",
      selector: (row) => row.medicalUnit,
    },
    {
      name: "Doctor",
      selector: (row) => row.doctorName,
    },
    {
      name: "Days of coverage",
      selector: (row) => row.coverageDays,
    },
    {
      name: "Start date",
      // selector: (row) => row.startDate,
      selector: (row) => format(new Date(row.startDate), "MM/dd/yyyy"),
    },
    {
      name: "End date",
      // selector: (row) => row.endDate,
      selector: (row) => format(new Date(row.endDate), "MM/dd/yyyy"),
    },
    {
      name: "Actions",
      selector: (row) => (
        <button onClick={() => handleDelete(row)}>Delete</button>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
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
