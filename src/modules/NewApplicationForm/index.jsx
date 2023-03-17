import React from "react";

const NewApplicationForm = () => {
  return (
    <form>
      <div>
        <label>Employee</label>
        <input type="text" name="employeeName" id="employeeName" />
      </div>
      <div>
        <label>Medical unit</label>
        <input type="text" name="medicalUnit" id="medicalUnit" />
      </div>
      <div>
        <label>Doctor</label>
        <input type="text" name="doctorName" id="doctorName" />
      </div>
      <div>
        <label>Days of coverage</label>
        <input type="number" name="coverageDays" id="coverageDays" />
      </div>
      <div>
        <label>Sick leave start date</label>
        <input type="text" name="startDate" id="startDate" />
      </div>
      <div>
        <label>Sick leave end date</label>
        <input type="text" name="endDate" id="endDate" />
      </div>
      <div>
        <label>Medical diagnostic</label>
        <textarea
          name="medicalDiagnostic"
          id="medicalDiagnostic"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <button>Submit application</button>
    </form>
  );
};

export { NewApplicationForm };
