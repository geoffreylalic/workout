import { useQuery } from "@tanstack/react-query";
import { getWorkout } from "../../queries/workouts";
import { useParams } from "react-router-dom";
import { Table } from "../../components/Table";
import { Button } from "@material-tailwind/react";
import { CreateExercicesDialog } from "../../components/CreateExercices";
import { useState } from "react";

const Workout = () => {
  const { workoutId } = useParams();
  const { data, error } = useQuery(getWorkout(workoutId));
  const [openAddEx, setOpenAddEx] = useState(true);

  if (data) {
    const createdAt = new Date(data.createdAt).toLocaleString();
    return (
      <div>
        <div className="flex justify-between p-5">
          <h1>
            {data?.name} - {createdAt}
          </h1>
          <Button
            onClick={() => {
              setOpenAddEx(true);
            }}
          >
            Add exercices
          </Button>
        </div>
        {data.exercices.length > 0 &&
          data.exercices?.map((exercice, index) => (
            <div className="p-3" key={index}>
              <div className="flex justify-between px-5 py-3">
                <div className="pb-1"> {exercice.name}</div>
                <Button>Delete</Button>
              </div>
              <Table
                data={exercice.sets}
                attributes={["repetitions", "weight", "rest"]}
                headers={["repetitions", "weight", "rest"]}
              />
            </div>
          ))}
        <CreateExercicesDialog open={openAddEx} setOpen={setOpenAddEx} workout={data} />
      </div>
    );
  }
};

export default Workout;
