import { useEffect } from "react";
import { useLogin, useApplications } from "../../hooks/store";
import { getApplicationsByUser } from "../../useContentful";
import { deleteApplication } from "../../useContentful";
import DataTable from "react-data-table-component";
import { parse, format } from "date-fns";

const ApplicationsTable = () => {
  const loggedUser = useLogin((state) => state.loggedUser);
  const applications = useApplications((state) => state.applications);
  const setApplications = useApplications((state) => state.setApplications);

  const formattedApplications = applications.map((app) => {
    app, (app.startDate = format(new Date(app.startDate), "MM/dd/yyyy"));
    app.endDate = format(new Date(app.endDate), "MM/dd/yyyy");
  });

  const onObtainUserApps = async () => {
    const apps = await getApplicationsByUser(loggedUser);
    let currentUserApps = [];
    if (loggedUser[0].employee.employeeId === 1) {
      currentUserApps = apps.filter(
        (app) => app.employee.employeeId === loggedUser[0].employee.employeeId
      );
    } else {
      currentUserApps = apps;
    }
    setApplications(currentUserApps);
    // console.log(currentUserApps);
    console.log("apps", applications);
  };

  const handleDelete = (row) => {
    console.log(row);
    deleteApplication(row.sysId);
    onObtainUserApps();
  };

  // useEffect(() => {
  // onObtainUserApps();
  // }, [applications]);

  //Probar pasar todos
  // Buscar como ignorar name para employee
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
      selector: (row) => row.startDate,
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
      selector: (row) => row.startDate,
    },
    {
      name: "End date",
      selector: (row) => row.endDate,
    },
    {
      name: "Actions",
      selector: (row) => (
        <button onClick={() => handleDelete(row)}>Delete</button>
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
      selector: (row) => row.startDate,
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
      selector: (row) => row.startDate,
    },
    {
      name: "End date",
      selector: (row) => row.endDate,
    },
    {
      name: "Actions",
      selector: (row) => (
        <button onClick={() => handleDelete(row)}>Delete</button>
      ),
    },
  ];

  useEffect(() => {
    onObtainUserApps();
  }, []);

  return (
    <>
      <DataTable
        columns={
          loggedUser[0].role === "employee" ? columnsEmployee : columnsHR
        }
        data={applications}
        // actions={[
        //   { icon: "delete", tooltip: "Eliminar aplicacion", onClick: () => {} },
        // ]}
        pagination
      />
    </>
  );
};

export { ApplicationsTable };
