import { useState, useEffect } from "react";

const useSearch = (value, data) => {
  //Local storage to manage search input
  const [search, setSearch] = useState(data);

  //Effect appears when searched value changes
  useEffect(() => {
    //Evaluates search input value
    if (value) {
      const searchApps = data.filter((app) => {
        return (
          //Change everything to lower cases in order to the values may coincide
          app.doctorName.toLowerCase().includes(value.toLowerCase()) ||
          app.medicalUnit.toLowerCase().includes(value.toLowerCase()) ||
          app.employee.fullName.toLowerCase().includes(value.toLowerCase())
        );
      });
      //Saves searched data
      setSearch(searchApps);
    } else {
      //If search input is empty
      setSearch(data);
    }
  }, [value]);

  return { search };
};

export { useSearch };
