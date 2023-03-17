import { useEffect } from "react";
import { useLogin, useApplications } from "../../hooks/store";
import { getApplicationsByUser } from "../../useContentful";
import DataTable from "react-data-table-component";

const ApplicationsTable = () => {
  const loggedUser = useLogin((state) => state.loggedUser);
  const applications = useApplications((state) => state.applications);
  const setApplications = useApplications((state) => state.setApplications);

  // Si applications esta vacio, que aparezca el mensaje de que no hay aplicaciones aun

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

  //Probar pasar todos
  // Buscar como ignorar name para employee
  const columns = [
    {
      name: "Medical diagnostic",
      selector: (row) => row.medicalDiagnostic,
    },
    {
      name: "Doctor",
      selector: (row) => row.doctorName,
    },
    {
      name: "Days of coverage",
      selector: (row) => row.coverageDays,
    },
  ];

  useEffect(() => {
    onObtainUserApps();
  }, []);

  return (
    <div>
      ApplicationsTable
      <p>{console.log(loggedUser)}</p>
      <DataTable columns={columns} data={applications} />
    </div>
  );
};

export { ApplicationsTable };
