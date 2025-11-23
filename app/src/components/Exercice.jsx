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
import { Check, GripVerticalIcon, Pencil, Trash2, X } from "lucide-react";

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
  const [isUpdate, setIsUpdate] = useState(false);
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
    setIsUpdate(false);
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
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="mb-6 rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-shadow bg-white"
      >
        <CardHeader className="pb-3 border-b flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="cursor-grab active:cursor-grabbing text-muted-foreground">
                <GripVerticalIcon
                  {...listeners}
                  className="h-6 w-6 opacity-70"
                />
              </div>

              {isUpdate ? (
                <div className="flex items-center gap-1 flex-1 mr-3">
                  <Input
                    type="text"
                    defaultValue={exercice.name}
                    onChange={(e) => setExerciceName(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleExerciceName}
                    className="h-8 w-8 rounded-md border-2 border-primary/40 hover:border-primary hover:bg-primary/10 transition-colors"
                  >
                    <Check className="h-4 w-4 text-primary" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsUpdate(false)}
                    className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <CardTitle className="text-lg font-semibold truncate">
                    {exercice.name}
                  </CardTitle>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsUpdate(true)}
                    className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2">
              <CreateSet workoutId={workoutId} exercice={exercice} />

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive transition"
                onClick={() => mutationExercice.mutate(exercice.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* TABLE */}
        <CardContent className="p-0">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={(event) => setActiveSet(event.active.data.current.set)}
          >
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-muted/60">
                  <TableHead className="w-8"></TableHead>
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
                  {exercice.sets.length > 0 ? (
                    exercice.sets
                      .sort((a, b) => a.position - b.position)
                      .map((set) => (
                        <RowSet
                          key={set.id}
                          id={set.id}
                          set={set}
                          workoutId={workoutId}
                        />
                      ))
                  ) : (
                    <RowSet isEmpty />
                  )}
                </SortableContext>
              </TableBody>

              {/* FOOTER */}
              <TableFooter>
                <TableRow className="bg-muted/30 font-medium">
                  <TableCell>Total</TableCell>
                  <TableCell>
                    {exercice.sets.reduce(
                      (acc, s) => acc + Number(s.repetitions || 0),
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    {exercice.sets.reduce(
                      (acc, s) => acc + Number(s.weight || 0),
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    {exercice.sets.reduce(
                      (acc, s) => acc + Number(s.rest || 0),
                      0
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {exercice.sets.length} sets
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>

            {/* DRAG OVERLAY */}
            <DragOverlay>
              {activeSet ? (
                <RowSet
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
