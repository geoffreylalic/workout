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
import { deleteExerciceFn, putExerciceFn } from "../queries/exercices";
import { useState } from "react";
import { Input } from "./ui/input";

const Exercice = ({ workoutId, exercice }) => {
  const [exerciceName, setExerciceName] = useState(exercice.name);
  const [isHovered, setIsHovered] = useState(false);

  const queryClient = useQueryClient();

  const mutationExercice = useMutation({
    mutationFn: deleteExerciceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] });
    },
  });

  const mutationPutExercice = useMutation({
    mutationFn: putExerciceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] });
    },
  });

  const handleExerciceName = () => {
    console.log(exerciceName);
    if (exerciceName !== exercice.name) {
      mutationPutExercice.mutate({
        id: exercice.id,
        body: { name: exerciceName },
      });
    }
  };

  return (
    <Card className="mb-6 shadow-sm border-border/40">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleExerciceName();
          }}
        >
          {isHovered ? (
            <Input
              type="text"
              name="exerciceName"
              placeholder={exercice.name}
              defaultValue={exercice.name}
              onChange={(e) => setExerciceName(e.target.value)}
            />
          ) : (
            <CardTitle className="text-lg font-semibold">
              {exercice.name}
            </CardTitle>
          )}
        </div>

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
