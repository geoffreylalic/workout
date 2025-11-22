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
import { GripVerticalIcon, Trash2 } from "lucide-react";

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
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RowSet } from "./RowSet";

const Exercice = ({ id, workoutId, exercice, isOverlay }) => {
  const [exerciceName, setExerciceName] = useState(exercice.name);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSet, setActiveSet] = useState(null);
  const totalReps = 0;
  const totalWeight = 0;
  const totaltRest = 0;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { exercice } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] });
      }, 0);
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
    if (!over || active.id === over.id) return;
    if (active.id !== over.id) {
      mutationPostSetPosition.mutate({
        id: exercice.id,
        body: { setId: active.id, position: over.data.current.sortable.index },
      });
    }
  };

  return (
    !isOverlay && (
      <Card
        className="mb-6 shadow-lg border border-border/40 rounded-xl"
        ref={setNodeRef}
        style={style}
        {...attributes}
        key={exercice.id}
        className="border-muted/30"
      >
        <CardHeader className="flex items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="cursor-grab active:cursor-grabbing text-muted-foreground select-none">
              <GripVerticalIcon
                {...listeners}
                className="h-5 w-5 cursor-grab"
              />
            </div>

            <div
              className="flex-1"
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
                  className="w-full"
                />
              ) : (
                <CardTitle className="text-xl font-bold text-gray-800 truncate">
                  {exercice.name}
                </CardTitle>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CreateSet workoutId={workoutId} exercice={exercice} />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => mutationExercice.mutate(exercice.id)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={(event) => setActiveSet(event.active.data.current.set)}
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
            <DragOverlay>
              {activeSet ? (
                <RowSet
                  key={activeSet.id}
                  id={activeSet.id}
                  set={activeSet}
                  workoutId={workoutId}
                  isOverlay
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </CardContent>
      </Card>
    )
  );
};

export default Exercice;
