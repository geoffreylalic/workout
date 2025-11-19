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
import {
  deleteExerciceFn,
  postSetPositionsFn,
  putExerciceFn,
} from "../queries/exercices";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RowSet } from "./RowSet";

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

  const mutationPostSetPosition = useMutation({
    mutationFn: postSetPositionsFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] });
    },
  });

  const handleExerciceName = () => {
    if (exerciceName !== exercice.name) {
      mutationPutExercice.mutate({
        id: exercice.id,
        body: { name: exerciceName },
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      console.log(active.id, over.data.current.sortable.index);
      mutationPostSetPosition.mutate({
        id: exercice.id,
        body: { setId: active.id, position: over.data.current.sortable.index },
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Reps</TableHead>
                <TableHead>Poids</TableHead>
                <TableHead>Repos</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <SortableContext
                items={exercice.sets.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {exercice.sets.length > 0 &&
                  exercice.sets
                    .sort((a, b) => a.position - b.position)
                    .map((set) => (
                      <RowSet
                        key={set.id}
                        id={set.id}
                        set={set}
                        workoutId={workoutId}
                      />
                    ))}
              </SortableContext>
              <TableRow>
                <CreateSet workoutId={workoutId} exercice={exercice} />
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Poids</TableCell>
                <TableCell>Repos</TableCell>
                <TableCell>Tonnage</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default Exercice;
