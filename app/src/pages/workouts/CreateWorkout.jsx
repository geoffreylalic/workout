import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createWorkoutFn, getWorkout } from "../../queries/workouts";

export const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutId, setWorkoutId] = useState(null);
  
  const queryClient = useQueryClient();

  const { data: workoutData, isLoading, isError } = useQuery({
    queryKey: ["workout", workoutId],
    queryFn: () => getWorkout(workoutId),
    enabled: !!workoutId,
  });

  console.log(workoutData)

  const mutationWorkout = useMutation({
    mutationFn: createWorkoutFn,
    onSuccess: (data) => {
      setWorkoutId(data.id); 
      queryClient.invalidateQueries({ queryKey: ["workout", data.id] });
    },
  });

  return (
    <div className="m-5">
      <h1 className="mb-5 text-xl font-bold">Create workout</h1>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Workout name"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <Button
          onClick={() => {
            if (workoutName.trim()) {
              mutationWorkout.mutate({ name: workoutName });
            }
          }}
        >
          Validate
        </Button>
      </div>

      {isLoading && <p>Chargement du workout...</p>}
      {isError && <p>Erreur lors du chargement du workout.</p>}
      {workoutData && (
        <div className="mt-4">
          <h2 className="font-semibold">Workout récupéré :</h2>
          <pre>{JSON.stringify(workoutData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
