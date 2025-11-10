import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

import Set from "./Set";
import CreateSet from "./CreateSet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExerciceFn } from "../queries/exercices";

const Exercice = ({ workoutId, exercice }) => {
  const queryClient = useQueryClient();
  const mutationExercice = useMutation({
    mutationFn: deleteExerciceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] });
    },
  });

  return (
    <Card className="mb-6 shadow-sm border-border/40">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold">{exercice.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => mutationExercice.mutate(exercice.id)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reps</TableHead>
              <TableHead>Poids</TableHead>
              <TableHead>Repos</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {exercice?.sets?.length > 0 &&
              exercice.sets.map((set, idx) => (
                <TableRow key={idx} className="border-muted/30">
                  <Set set={set} workoutId={workoutId} />
                </TableRow>
              ))}
            <CreateSet workoutId={workoutId} exerciceId={exercice.id} />
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell>Total reps</TableCell>
              <TableCell>Total poids</TableCell>
              <TableCell>Total repos</TableCell>
              <TableCell>Total tonnage</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Exercice;
