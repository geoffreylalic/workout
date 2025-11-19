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
  const totalReps = 0;
  const totalWeight = 0;
  const totaltRest = 0;

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
      mutationPostSetPosition.mutate({
        id: exercice.id,
        body: { setId: active.id, position: over.data.current.sortable.index },
      });
    }
  };

  return (
    <Card className="mb-6 shadow-lg border border-border/40 rounded-xl">
      <CardHeader className="flex items-center justify-between pb-4">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleExerciceName();
          }}
          className="flex-1"
        >
          {isHovered ? (
            <Input
              type="text"
              name="exerciceName"
              placeholder={exercice.name}
              defaultValue={exercice.name}
              onChange={(e) => setExerciceName(e.target.value)}
              className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-md px-2 py-1"
            />
          ) : (
            <CardTitle className="text-xl font-bold text-gray-800">
              {exercice.name}
            </CardTitle>
          )}
        </div>
        <CreateSet workoutId={workoutId} exercice={exercice} />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive transition-colors duration-200"
          onClick={() => mutationExercice.mutate(exercice.id)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table className="min-w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-gray-100">
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
            </TableBody>

            <TableFooter>
              <TableRow className="bg-gray-50 font-semibold">
                <TableCell>Total</TableCell>
                <TableCell>
                  {exercice.sets.reduce(
                    (acc, set) =>
                      acc +
                      (!isNaN(Number(set.repetitions))
                        ? Number(set.repetitions)
                        : 0),
                    0
                  )}
                </TableCell>
                <TableCell>
                  {exercice.sets.reduce(
                    (acc, set) =>
                      acc +
                      (!isNaN(Number(set.weight)) ? Number(set.weight) : 0),
                    0
                  )}
                </TableCell>
                <TableCell>
                  {exercice.sets.reduce(
                    (acc, set) =>
                      acc + (!isNaN(Number(set.rest)) ? Number(set.rest) : 0),
                    0
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {exercice.sets.length} Sets
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default Exercice;
