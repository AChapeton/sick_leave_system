import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { useLogin, useApplications } from "../../hooks/store";
import { createApplication, getAllEmployees } from "../../useContentful";
import { v4 } from "uuid";
const DEFAULT_LNG = "en-US";

const NewApplicationForm = () => {
  const navigate = useNavigate();
  const loggedUser = useLogin((state) => state.loggedUser);
  const [employees, setEmployees] = useState([]);
  const [days, setDays] = useState(0);

  let onSubmit = () => {};
  let getEmployees = () => {};

  if (loggedUser[0].role === "hr_specialist") {
    getEmployees = async () => {
      const allEmployees = await getAllEmployees();
      setEmployees(allEmployees);
    };
  }

  useEffect(() => {
    getEmployees();
  }, []);

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const startDateWatched = watch(["startDate"]);
  const endDateWatched = watch(["endDate"]);
  const coverageDaysWatched = watch(["coverageDays"]);

  if (days > 0 && days === Number(coverageDaysWatched.toString())) {
    onSubmit = async (applicationData) => {
      const newStartDate = new Date(applicationData.startDate);
      const newEndDate = new Date(applicationData.endDate);
      if (loggedUser[0].role === "hr_specialist") {
        console.log(applicationData);
        await createApplication({
          fields: {
            applicationId: { [DEFAULT_LNG]: v4() },
            employeeId: {
              [DEFAULT_LNG]: {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: applicationData.sysId,
                },
              },
            },
            medicalUnit: { [DEFAULT_LNG]: applicationData.medicalUnit },
            startDate: { [DEFAULT_LNG]: newStartDate },
            endDate: { [DEFAULT_LNG]: newEndDate },
            doctorName: { [DEFAULT_LNG]: applicationData.doctorName },
            medicalDiagnostic: {
              [DEFAULT_LNG]: applicationData.medicalDiagnostic,
            },
            coverageDays: {
              [DEFAULT_LNG]: (applicationData.coverageDays = parseInt(
                applicationData.coverageDays
              )),
            },
          },
        });
      } else {
        applicationData.employeeId = loggedUser[0].employee.sysId;
        console.log(applicationData);
        console.log(v4());
        await createApplication({
          fields: {
            applicationId: { [DEFAULT_LNG]: v4() },
            employeeId: {
              [DEFAULT_LNG]: {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: applicationData.employeeId,
                },
              },
            },
            medicalUnit: { [DEFAULT_LNG]: applicationData.medicalUnit },
            startDate: { [DEFAULT_LNG]: newStartDate },
            endDate: { [DEFAULT_LNG]: newEndDate },
            doctorName: { [DEFAULT_LNG]: applicationData.doctorName },
            medicalDiagnostic: {
              [DEFAULT_LNG]: applicationData.medicalDiagnostic,
            },
            coverageDays: {
              [DEFAULT_LNG]: (applicationData.coverageDays = parseInt(
                applicationData.coverageDays
              )),
            },
          },
        });
      }
      navigate(-1);
    };
  }

  useEffect(() => {
    const days = differenceInCalendarDays(
      parseISO(...endDateWatched),
      parseISO(...startDateWatched)
    );
    setDays(days);
  }, [startDateWatched, endDateWatched]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loggedUser[0].role === "hr_specialist" ? (
        <div>
          <label>Employee</label>
          <select
            name="sysId"
            id="sysId"
            {...register("sysId", { required: true })}
          >
            {employees.map((employee) => {
              {
                // console.log("test", employee);
              }
              return (
                <option key={employee.sysId} value={employee.sysId}>
                  {employee.fullName}
                </option>
              );
            })}
          </select>
          {errors.sysId?.type === "required" && (
            <p>Employee's name is required</p>
          )}
        </div>
      ) : null}
      <div>
        <label>Medical unit</label>
        <select
          name="medicalUnit"
          id="medicalUnit"
          {...register("medicalUnit", { required: true })}
        >
          <option value="" disabled>
            Select option
          </option>
          <option value="isss">ISSS</option>
          <option value="minsal">MINSAL</option>
        </select>
        {errors.medicalUnit?.type === "required" && (
          <p>Medical unit is required</p>
        )}
      </div>
      <div>
        <label>Doctor</label>
        <input
          type="text"
          name="doctorName"
          id="doctorName"
          {...register("doctorName", { required: true })}
        />
        {errors.doctorName?.type === "required" && (
          <p>Doctor's name is required</p>
        )}
      </div>
      <div>
        <label>Days of coverage</label>
        <input
          type="number"
          name="coverageDays"
          id="coverageDays"
          // min="1"
          {...register("coverageDays", { required: true, min: 1 })}
        />
        {errors.coverageDays?.type === "required" && (
          <p>Coverage days are required</p>
        )}
        {errors.coverageDays?.type === "min" && (
          <p>Coverage days cannot be minor than 1</p>
        )}
        {days !== Number(coverageDaysWatched.toString()) && (
          <p>Converage days does not coincide with dates</p>
        )}
      </div>
      <div>
        <label>Sick leave start date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          {...register("startDate", {
            required: true,
            validate: true,
          })}
        />
        {errors.startDate?.type === "required" && <p>Start date is required</p>}
        {days <= 0 && <p>Start date cannot be bigger or equal than end date</p>}
      </div>
      <div>
        <label>Sick leave end date</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          {...register("endDate", { required: true })}
        />
        {errors.endDate?.type === "required" && <p>End date is required</p>}
      </div>
      <div>
        <label>Medical diagnostic</label>
        <textarea
          name="medicalDiagnostic"
          id="medicalDiagnostic"
          cols="30"
          rows="10"
          {...register("medicalDiagnostic", { required: true })}
        ></textarea>
        {errors.medicalDiagnostic?.type === "required" && (
          <p>Medical diagnostic is required</p>
        )}
      </div>
      <button>Submit application</button>
    </form>
  );
};

export { NewApplicationForm };
