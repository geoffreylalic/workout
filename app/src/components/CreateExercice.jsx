import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExerciceFn } from "../queries/exercices";
import { useState } from "react";

const CreateExercice = ({ workout }) => {
  const [exerciceName, setExerciceName] = useState("");
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();

  const mutationExercice = useMutation({
    mutationFn: createExerciceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", workout.id] });
      setExerciceName("");
      setError(null);
    },
    onError: () => {
      setError("Une erreur est survenue. Réessayez.");
    },
  });

  const handleSubmit = () => {
    if (!exerciceName.trim()) {
      setError("Le nom de l’exercice ne peut pas être vide.");
      return;
    }
    mutationExercice.mutate({
      workoutId: workout.id,
      position: workout.exercices.length,
      name: exerciceName,
    });
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm max-w-md bg-white">
      <h1 className="mb-4 text-lg font-semibold">Ajouter un exercice</h1>

      <div className="space-y-3">
        <Input
          type="text"
          placeholder="Ex: Développé couché"
          value={exerciceName}
          onChange={(e) => setExerciceName(e.target.value)}
          className={error ? "border-red-500" : ""}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={mutationExercice.isPending}
        >
          {mutationExercice.isPending ? "Ajout..." : "Valider"}
        </Button>
      </div>
    </div>
  );
};

export default CreateExercice;
