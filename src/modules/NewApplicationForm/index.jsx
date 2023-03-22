import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/store";
import { useCompareDates } from "../../hooks/useCompareDates";
import { createApplication, getAllEmployees } from "../../useContentful";
import { v4 } from "uuid";
import styles from "./styles.module.scss";
const DEFAULT_LNG = "en-US";

const NewApplicationForm = () => {
  const navigate = useNavigate();
  const loggedUser = useLogin((state) => state.loggedUser);
  const [employees, setEmployees] = useState([]);

  //Form hook to validate inputs
  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //Custom hook to obtain days between two dates
  const coverageDaysWatched = watch(["coverageDays"]);
  const startDateWatched = watch(["startDate"]);
  const endDateWatched = watch(["endDate"]);
  const { days } = useCompareDates(startDateWatched, endDateWatched);

  //Declare variables with empty functions
  let onSubmit = () => {};
  let getEmployees = () => {};

  //Evaluates if logged user has an HR role to fill select with employees's names
  if (loggedUser[0].role === "hr_specialist") {
    getEmployees = async () => {
      const allEmployees = await getAllEmployees();
      setEmployees(allEmployees);
    };

    //Calls getEmployees on first render
    useEffect(() => {
      getEmployees();
    }, []);
  }

  //Form validations before submit
  if (days > 0 && days === Number(coverageDaysWatched.toString())) {
    onSubmit = async (applicationData) => {
      //Change dates format
      const newStartDate = new Date(applicationData.startDate);
      const newEndDate = new Date(applicationData.endDate);
      //When a user with HR role logged in
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
        //When a user with Employee role logged in
        //It takes logged user data to save it on the new application
        applicationData.employeeId = loggedUser[0].employee.sysId;
        await createApplication({
          fields: {
            applicationId: { [DEFAULT_LNG]: v4() },
            employeeId: {
              [DEFAULT_LNG]: {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  //It uses logged user data that is saved before
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
      //Returns Home after submit
      navigate("/home");
    };
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.newApp}>
      {loggedUser[0].role === "hr_specialist" ? (
        <div className={styles.newApp__container}>
          <label className={styles.newApp__label}>Employee</label>
          <select
            name="sysId"
            id="sysId"
            className={styles.newApp__input}
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
            <p className={styles.newApp__error}>Employee's name is required</p>
          )}
        </div>
      ) : null}
      <div className={styles.newApp__area}>
        <div className={styles.newApp__container}>
          <label className={styles.newApp__label}>Medical unit</label>
          <select
            name="medicalUnit"
            id="medicalUnit"
            className={styles.newApp__input}
            {...register("medicalUnit", { required: true })}
          >
            <option value="" disabled>
              Select option
            </option>
            <option value="isss">ISSS</option>
            <option value="minsal">MINSAL</option>
          </select>
          {errors.medicalUnit?.type === "required" && (
            <p className={styles.newApp__error}>Medical unit is required</p>
          )}
        </div>
        <div className={styles.newApp__container}>
          <label className={styles.newApp__label}>Doctor</label>
          <input
            type="text"
            name="doctorName"
            id="doctorName"
            className={styles.newApp__input}
            {...register("doctorName", { required: true })}
          />
          {errors.doctorName?.type === "required" && (
            <p className={styles.newApp__error}>Doctor's name is required</p>
          )}
        </div>
        <div className={styles.newApp__container}>
          <label className={styles.newApp__label}>Days of coverage</label>
          <input
            type="number"
            name="coverageDays"
            id="coverageDays"
            className={styles.newApp__input}
            // min="1"
            {...register("coverageDays", { required: true, min: 1 })}
          />
          {errors.coverageDays?.type === "required" && (
            <p className={styles.newApp__error}>Coverage days are required</p>
          )}
          {errors.coverageDays?.type === "min" && (
            <p className={styles.newApp__error}>
              Coverage days cannot be minor than 1
            </p>
          )}
          {days !== Number(coverageDaysWatched.toString()) && (
            <p className={styles.newApp__error}>
              Converage days does not coincide with dates
            </p>
          )}
        </div>
        <div className={styles.newApp__container}>
          <label className={styles.newApp__label}>Sick leave start date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className={styles.newApp__input}
            {...register("startDate", {
              required: true,
              validate: true,
            })}
          />
          {errors.startDate?.type === "required" && (
            <p className={styles.newApp__error}>Start date is required</p>
          )}
          {days <= 0 && (
            <p className={styles.newApp__error}>
              Start date cannot be bigger or equal than end date
            </p>
          )}
        </div>
        <div className={styles.newApp__container}>
          <label className={styles.newApp__label}>Sick leave end date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className={styles.newApp__input}
            {...register("endDate", { required: true })}
          />
          {errors.endDate?.type === "required" && (
            <p className={styles.newApp__error}>End date is required</p>
          )}
        </div>
      </div>
      <div className={styles.newApp__container}>
        <label className={styles.newApp__label}>Medical diagnostic</label>
        <textarea
          name="medicalDiagnostic"
          id="medicalDiagnostic"
          className={styles.newApp__textarea}
          cols="30"
          rows="10"
          {...register("medicalDiagnostic", { required: true })}
        ></textarea>
        {errors.medicalDiagnostic?.type === "required" && (
          <p className={styles.newApp__error}>Medical diagnostic is required</p>
        )}
      </div>
      <button className={styles.newApp__button}>Submit application</button>
    </form>
  );
};

export { NewApplicationForm };
