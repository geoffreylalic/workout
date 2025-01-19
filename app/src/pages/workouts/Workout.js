import { useQuery } from "@tanstack/react-query";
import { getWorkout } from "../../queries/workouts";
import { useParams } from "react-router-dom";
import { Table } from "../../components/Table";

const Workout = () => {
  const { exerciceId } = useParams();
  const { data, error } = useQuery(getWorkout(exerciceId));

  if (data) {
    const createdAt = new Date(data.createdAt).toLocaleString();
    return (
      <div>
        <h1>
          {data?.name} - {createdAt}
        </h1>
        {data.exercices.length > 0 &&
          data.exercices?.map((exercice, index) => (
            <div className="p-3" key={index}>
              <div className="pb-1"> {exercice.name}</div>
              <Table
                data={exercice.sets}
                attributes={["repetitions", "weight", "rest"]}
                headers={["repetitions", "weight", "rest"]}
              />
            </div>
          ))}
      </div>
    );
  }
};

export default Workout;
