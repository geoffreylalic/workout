import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getWorkouts } from "../../queries/workouts";
import { Button, Typography } from "@material-tailwind/react";
import { Table } from "../../components/Table";
import { CreateWorkoutDialog } from "../../components/CreateWorkoutDialog";
import Calendar from "../../components/Calendar";

const Workouts = () => {
  const [open, setOpen] = useState(false);
  const { data, error } = useQuery(getWorkouts);
  if (error) {
    console.error(error);
  }

  const SimplefiedWorkouts = () => (
    <div className="pt-5">
      <Table
        data={data}
        attributes={["name", "createdAt"]}
        headers={["Name", "Date creation", "action", "delete"]}
        view
        del
      />
      <CreateWorkoutDialog open={open} setOpen={setOpen} />
    </div>
  );

  const CalendarWorkouts = () => (
    <div className="pt-5">
      <Calendar />
    </div>
  );

  if (data) {
    return (
      <div className="pl-5 pt-5">
        <div className="flex justify-between px-3">
          <Typography variant="h4">Workouts</Typography>
          <Button
            type="button"
            className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={setOpen}
          >
            Add workout
          </Button>
        </div>
        <SimplefiedWorkouts />
      </div>
    );
  }
};

export default Workouts;
