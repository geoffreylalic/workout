import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getWorkouts } from "../../queries/workouts";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Calendar from "../../components/Calendar";
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

const Workouts = () => {
  const { data, error } = useQuery(getWorkouts);
  if (error) {
    console.log(error);
  }
  const RenderWorkouts = () =>
    data.map((workout, key) => (
      <Card
        color="gray"
        variant="gradient"
        className="w-full max-w-[20rem] p-8"
        key={key}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center "
        >
          <Typography className="text-2xl font-bold">{workout.name}</Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <Typography className="font-normal">
                Life time technical support
              </Typography>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="mt-12 p-0">
          <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
            Get detail
          </Button>
        </CardFooter>
      </Card>
    ));
  if (data) {
    return (
      <div className="mx-auto">
        <div className="justify-between grid grid-cols-5 gap-10">
          <RenderWorkouts />
        </div>
        <Calendar />
      </div>
    );
  }
};

export default Workouts;
