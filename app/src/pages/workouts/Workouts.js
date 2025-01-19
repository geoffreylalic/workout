import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getWorkouts } from "../../queries/workouts";
import { Button } from "@material-tailwind/react";
import { Table } from "../../components/Table";
import { CreateWorkoutDialog } from "../../components/CreateWorkoutDialog";

const Workouts = () => {
  const [open, setOpen] = useState(false);
  const { data, error } = useQuery(getWorkouts);
  if (error) {
    console.error(error);
  }

  if (data) {
    return (
      <div className="pl-5 pt-5">
        <div className="flex justify-between px-3">
          <div>workouts</div>
          <Button
            type="button"
            className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={setOpen}
          >
            Add workout
          </Button>
          {/* <div className="justify-between grid grid-cols-5 gap-10"></div> */}
          {/* <Calendar addName="add workout  " onClickAdd={handleAdd} /> */}
        </div>
        <div className="pt-5">
          <Table
            data={data}
            attributes={["name", "createdAt", "id"]}
            headers={["name", "Date creation", "id", "action"]}
            view="id"
          />
          <CreateWorkoutDialog open={open} setOpen={setOpen} />
        </div>
      </div>
    );
  }
};

export default Workouts;
