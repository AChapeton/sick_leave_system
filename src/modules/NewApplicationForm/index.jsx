import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { useLogin, useApplications } from "../../hooks/store";

const NewApplicationForm = () => {
  const loggedUser = useLogin((state) => state.loggedUser);
  const applications = useApplications((state) => state.applications);
  const [days, setDays] = useState(0);
  let onSubmit = () => {};

  const applicationEmployee = applications.map((app) => app.employee);

  let appMap = applicationEmployee.map((employee) => {
    return [JSON.stringify(employee), employee];
  });

  let appMapArr = new Map(appMap);

  let uniqueEmployees = [...appMapArr.values()];

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
      if (loggedUser[0].role === "hr_specialist") {
        console.log(applicationData);
      } else {
        const newAppData = applicationData;
        newAppData.employeeId = loggedUser[0].employee.employeeId;
        console.log(newAppData);
      }
    };
  }

  useEffect(() => {
    // console.log(startDateWatched, endDateWatched);
    const days = differenceInCalendarDays(
      parseISO(...endDateWatched),
      parseISO(...startDateWatched)
    );
    // console.log("days", days);
    // console.log("cover", ...coverageDaysWatched);
    setDays(days);
  }, [startDateWatched, endDateWatched]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loggedUser[0].role === "hr_specialist" ? (
        <div>
          <label>Employee</label>
          <select
            name="employeeId"
            id="employeeId"
            {...register("employeeId", { required: true })}
          >
            {uniqueEmployees.map((employee) => {
              {
                // console.log("test", employee);
              }
              return (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.fullName}
                </option>
              );
            })}
          </select>
          {errors.employeeId?.type === "required" && (
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
