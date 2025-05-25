import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExerciceFn } from "../queries/exercices";
import { useState } from "react";

const CreateExercice = ({ workoutId }) => {
  const [exerciceName, setExerciceName] = useState("");

  const queryClient = useQueryClient();

  const mutationExercice = useMutation({
    mutationFn: createExerciceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workouts", workoutId],
      });
    },
  });

  return (
    <div className="m-5">
      <h1 className="mb-3 text-xl font-bold">Créer un exercice</h1>

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Exercise name"
          value={exerciceName}
          onChange={(e) => setExerciceName(e.target.value)}
        />
        <Button
          onClick={() => {
            if (exerciceName.trim()) {
              mutationExercice.mutate({
                workoutId,
                name: exerciceName,
              });
            }
          }}
          disabled={mutationExercice.isPending}
        >
          {mutationExercice.isPending ? "Ajout..." : "Valider"}
        </Button>
      </div>
    </div>
  );
};

export default CreateExercice;
