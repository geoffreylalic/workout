import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createExerciceFn, getExercice } from "../queries/exercices";
import { Sets } from "./Sets";
import CreateSet from "./CreateSet";

const Exercices = ({ workoutId }) => {
  const [exerciceName, setExerciceName] = useState("");
  const [exerciceId, setExerciceId] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: exerciceData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workouts", workoutId, "exercices", exerciceId],
    queryFn: () => getExercice(exerciceId),
    enabled: !!exerciceId,
  });

  const mutationExercice = useMutation({
    mutationFn: createExerciceFn,
    onSuccess: (data) => {
      setExerciceId(data.id);
      queryClient.invalidateQueries({
        queryKey: ["workouts", workoutId, "exercices", data.id],
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

      {isLoading && <p>Chargement de l'exercice...</p>}
      {isError && <p>Erreur lors du chargement de l'exercice.</p>}
      {exerciceData && (
        <>
          <h2 className="text-lg font-semibold mb-2">Détails de l'exercice</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repetitions</TableHead>
                <TableHead>Poids</TableHead>
                <TableHead>Repos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exerciceId &&
                exerciceData?.sets?.length > 0 &&
                exerciceData?.sets?.map((set, key) => (
                  <TableRow key={key}>
                    <Sets set={set} />
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <CreateSet workoutId={workoutId} exerciceId={exerciceId} />
              </TableRow>
            </TableFooter>
          </Table>
        </>
      )}
    </div>
  );
};

export default Exercices;
