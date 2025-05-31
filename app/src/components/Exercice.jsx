import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import Set from "./Set";
import CreateSet from "./CreateSet";
import { TableCell } from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExerciceFn } from "../queries/exercices";

const Exercice = ({ workoutId, exercice }) => {
  const queryClient = useQueryClient();
  const mutationExercice = useMutation({
    mutationFn: deleteExerciceFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] });
    },
  });

  return (
    <div className="m-5">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-2">{exercice.name}</h2>
          <Button onClick={() => mutationExercice.mutate(exercice.id)}>
            Supprimer
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Repetitions</TableHead>
              <TableHead>Poids</TableHead>
              <TableHead>Repos</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercice &&
              exercice?.sets?.length > 0 &&
              exercice?.sets?.map((set, key) => (
                <TableRow key={key}>
                  <Set set={set} workoutId={workoutId} />
                </TableRow>
              ))}
            <CreateSet workoutId={workoutId} exerciceId={exercice.id} />
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total repetitions{} </TableCell>
              <TableCell>Total poids </TableCell>
              <TableCell>Total repos {} </TableCell>
              <TableCell>Total tonage</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
    </div>
  );
};

export default Exercice;
