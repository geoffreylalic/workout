import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getWorkouts } from "../../queries/workouts";

import Calendar from "../../components/Calendar";
// function CheckIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={2}
//       stroke="currentColor"
//       className="h-3 w-3"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M4.5 12.75l6 6 9-13.5"
//       />
//     </svg>
//   );
// }

const Workouts = () => {
  const { data, error } = useQuery(getWorkouts);
  const handleAdd = () => {
    console.log("clicked");
  };
  if (error) {
    console.log(error);
  }

  if (data) {
    return (
      <div className="mx-auto">
        <div className="justify-between grid grid-cols-5 gap-10"></div>
        <Calendar addName="add workout" onClickAdd={handleAdd} />
      </div>
    );
  }
};

export default Workouts;
