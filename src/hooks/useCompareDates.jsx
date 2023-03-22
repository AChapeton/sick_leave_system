import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { differenceInCalendarDays, parseISO } from "date-fns";

const useCompareDates = (startDate, endDate) => {
  //Saves days amount on local state
  const [days, setDays] = useState(0);

  //Form hook saving data to evaluate. Similiar to a useRef
  const { watch } = useForm();

  //Evaluates the amount of days between start and end dates
  useEffect(() => {
    const daysAmmount = differenceInCalendarDays(
      parseISO(...endDate),
      parseISO(...startDate)
    );
    //Saves days amount on local storage
    setDays(daysAmmount);
  }, [startDate, endDate]);

  // console.log("days", days);
  return { days };
};

export { useCompareDates };
