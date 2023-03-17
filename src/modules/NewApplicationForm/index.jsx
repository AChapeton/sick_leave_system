import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { differenceInCalendarDays, parseISO } from "date-fns";

const NewApplicationForm = () => {
  const [days, setDays] = useState(0);
  let onSubmit = () => {};

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
      console.log(applicationData);
    };
  }

  useEffect(() => {
    console.log(startDateWatched, endDateWatched);
    const days = differenceInCalendarDays(
      parseISO(...endDateWatched),
      parseISO(...startDateWatched)
    );
    console.log("days", days);
    console.log("cover", ...coverageDaysWatched);
    setDays(days);
  }, [startDateWatched, endDateWatched]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Employee</label>
        <input
          type="text"
          name="employeeName"
          id="employeeName"
          {...register("employeeName", { required: true })}
        />
        {errors.employeeName?.type === "required" && (
          <p>Employee's name is required</p>
        )}
      </div>
      <div>
        <label>Medical unit</label>
        <input
          type="text"
          name="medicalUnit"
          id="medicalUnit"
          {...register("medicalUnit", { required: true })}
        />
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
