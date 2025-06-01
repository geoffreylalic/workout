import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkoutFn, getWorkout } from "../../queries/workouts";
import Exercice from "../../components/Exercice";
import CreateExercice from "../../components/CreateExercice";
import { useParams } from "react-router";

export const Workout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [createWorkoutId, setCreateWorkoutId] = useState();
  const { workoutId } = useParams();

  const parsedWorkoutId = parseInt(createWorkoutId || workoutId);

  const queryClient = useQueryClient();

  const {
    data: workoutData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workouts", parsedWorkoutId],
    queryFn: () => getWorkout(parsedWorkoutId),
    enabled: !!parsedWorkoutId,
  });

  const mutationWorkout = useMutation({
    mutationFn: createWorkoutFn,
    onSuccess: (data) => {
      setCreateWorkoutId(data.id);
      queryClient.invalidateQueries({ queryKey: ["workouts", data.id] });
    },
  });

  return (
    <div className="m-5">
      <h1 className="mb-5 text-xl font-bold">Workout</h1>
      {workoutData ? (
        <h1 className="mb-5 text-xl font-bold">{workoutData.name}</h1>
      ) : (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Workout name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
          {workoutName && (
            <Button
              onClick={() => {
                if (workoutName.trim()) {
                  mutationWorkout.mutate({ name: workoutName });
                }
              }}
            >
              Validate
            </Button>
          )}
        </div>
      )}

      {isLoading && <p>Chargement du workout...</p>}
      {isError && <p>Erreur lors du chargement du workout.</p>}
      <div>
        {workoutData &&
          workoutData?.exercices?.length > 0 &&
          workoutData?.exercices?.map((exercice, key) => (
            <Exercice
              workoutId={parsedWorkoutId}
              exercice={exercice}
              key={key}
            />
          ))}

        {parsedWorkoutId && (
          <CreateExercice workoutId={parseInt(parsedWorkoutId)} />
        )}
      </div>
    </div>
  );
};
