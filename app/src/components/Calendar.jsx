// import React, { useState } from "react";
// import { Button } from "@material-tailwind/react";
// import dayjs from "dayjs";
// import { MONTHS } from "../utils";
// import { CreateWorkoutDialog } from "./CreateWorkoutDialog";

// const Calendar = (props) => {
//   const [open, setOpen] = useState(false);
//   const { addName, onClickAdd } = props;
//   const [currentDate, setCurrentDate] = useState(dayjs());
//   const nbDaysinMonth = currentDate.daysInMonth();
//   const [daysDisplay, setDaysDisplay] = useState([]);
//   const [firstDayCal, setFirstDayCal] = useState(null);
//   const [lastDayCal, setLastDayCal] = useState(null);
//   const days = [];
//   for (let day = 1; day <= nbDaysinMonth; day++) {
//     days.push(
//       dayjs(
//         `${currentDate.month() + 1}-${day}-${currentDate.year()}`,
//         "MM-DD-YYYY"
//       )
//     );
//   }
//   // get first monday
//   // 0 = sunday
//   let firstDate = days.length > 0 && days[0];
//   let lastDate = days.length > 0 && days[days.length - 1];
//   // get first monday
//   while (firstDate.day() !== 1) {
//     firstDate = firstDate.subtract(1, "day");
//     days.push(firstDate);
//   }

//   // get last sunday
//   while (lastDate.day() !== 0) {
//     lastDate = lastDate.add(1, "day");
//     days.push(lastDate);
//   }
//   days.sort((day1, day2) => day1.toDate() - day2.toDate());

//   const handleNextMonth = () => setCurrentDate(currentDate.add(1, "M"));

//   const handlePreviousMonth = () =>
//     setCurrentDate(currentDate.subtract(1, "M"));

//   return (
//     <div className="lg:flex lg:h-full lg:flex-col">
//       <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
//         <h1 className="text-base font-semibold leading-6 text-gray-900">
//           {`${MONTHS[currentDate.month() + 1]} ${currentDate.year()}`}
//         </h1>
//         <div className="flex items-center">
//           <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
//             <button
//               type="button"
//               className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
//               onClick={handlePreviousMonth}
//             >
//               <span className="sr-only">Previous month</span>
//               <svg
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//             <button
//               type="button"
//               className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
//             >
//               Today
//             </button>
//             <button
//               type="button"
//               className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
//               onClick={handleNextMonth}
//             >
//               <span className="sr-only">Next month</span>
//               <svg
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="relative ml-6 md:hidden">
//             <button
//               type="button"
//               className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
//               id="menu-0-button"
//               aria-expanded="false"
//               aria-haspopup="true"
//             >
//               <span className="sr-only">Open menu</span>
//               <svg
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>
//       <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
//         <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
//           <div className="flex justify-center bg-white py-2">
//             <span>M</span>
//             <span className="sr-only sm:not-sr-only">on</span>
//           </div>
//           <div className="flex justify-center bg-white py-2">
//             <span>T</span>
//             <span className="sr-only sm:not-sr-only">ue</span>
//           </div>
//           <div className="flex justify-center bg-white py-2">
//             <span>W</span>
//             <span className="sr-only sm:not-sr-only">ed</span>
//           </div>
//           <div className="flex justify-center bg-white py-2">
//             <span>T</span>
//             <span className="sr-only sm:not-sr-only">hu</span>
//           </div>
//           <div className="flex justify-center bg-white py-2">
//             <span>F</span>
//             <span className="sr-only sm:not-sr-only">ri</span>
//           </div>
//           <div className="flex justify-center bg-white py-2">
//             <span>S</span>
//             <span className="sr-only sm:not-sr-only">at</span>
//           </div>
//           <div className="flex justify-center bg-white py-2">
//             <span>S</span>
//             <span className="sr-only sm:not-sr-only">un</span>
//           </div>
//         </div>
//         <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
//           <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
//             {days.map((day, index) => {
//               return (
//                 <div
//                   key={index}
//                   className={`relative ${
//                     day.month() === currentDate.month()
//                       ? "bg-white"
//                       : "bg-gray-500"
//                   } px-3 py-2`}
//                 >
//                   <time dateTime="2022-01-23">{day.date()}</time>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <CreateWorkoutDialog open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Calendar;
