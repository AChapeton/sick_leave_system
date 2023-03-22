import { format } from "date-fns";
import { NavLink } from "react-router-dom";

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
    //Change date format
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
    //Change date format
    selector: (row) => format(new Date(row.startDate), "MM/dd/yyyy"),
  },
  {
    name: "End date",
    //Change date format
    selector: (row) => format(new Date(row.endDate), "MM/dd/yyyy"),
  },
  {
    name: "Actions",
    //Moves to confirmation delete page who receives row's data
    selector: (row) => (
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
    //Change date format
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
    //Change date format
    selector: (row) => format(new Date(row.startDate), "MM/dd/yyyy"),
  },
  {
    name: "End date",
    //Change date format
    selector: (row) => format(new Date(row.endDate), "MM/dd/yyyy"),
  },
  {
    name: "Actions",
    //Moves to confirmation delete page who receives row's data
    selector: (row) => (
      <button onClick={() => handleDelete(row)}>Delete</button>
    ),
  },
];

export { columnsHR, columnsEmployee };
