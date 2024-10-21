import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getWorkout } from "../../queries/workouts";
import { useParams } from "react-router-dom";
import { Table } from "../../components/Table";

const Workout = () => {
  const { exerciceId } = useParams();
  const { data, error } = useQuery(getWorkout(exerciceId));

  return (
    <div>
      {data && (
        <div>
          <h1>
            {data?.name} - {data?.createdAt}
          </h1>
          {data.exercices.length > 0 &&
            data.exercices?.map((exercice, index) => (
              <div key={index}>
                <div> {exercice.name}</div>
                <Table
                  data={exercice.sets}
                  attributes={[
                    "id",
                    "exerciceId",
                    "repetitions",
                    "weight",
                    "rest",
                  ]}
                  headers={[
                    "id",
                    "exerciceId",
                    "repetitions",
                    "weight",
                    "rest",
                  ]}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Workout;
