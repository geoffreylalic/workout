import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWorkout,
  postExercicePositionsFn,
  updateWorkoutFn,
} from "../../queries/workouts";
import Exercice from "../../components/Exercice";
import CreateExercice from "../../components/CreateExercice";
import { useParams } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Trash2, X } from "lucide-react";

export const Workout = () => {
  const { workoutId } = useParams();
  const id = Number(workoutId);
  const [activeExercice, setExerciceActive] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [workoutName, setWorkoutName] = useState(null);
  const queryClient = useQueryClient();

  if (isNaN(id)) return <div>ID invalide</div>;

  const {
    data: workout,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workouts", id],
    queryFn: () => getWorkout(id),
  });

  const mutationWorkout = useMutation({
    mutationFn: updateWorkoutFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", id] });
    },
  });

  const mutationPostExercicePosition = useMutation({
    mutationFn: postExercicePositionsFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", id] });
    },
  });

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
      mutationPostExercicePosition.mutate({
        id: id,
        body: {
          exerciceId: active.data.current.exercice.id,
          position: over.data.current.sortable.index,
        },
      });
    }
  };

  const handleValidateName = () => {
    if (workout.name !== workoutName) {
      mutationWorkout.mutate({ id: workout.id, body: { name: workoutName } });
    }
    setIsUpdate(false);
  };

  if (isError) return <div>Erreur lors du chargement</div>;
  if (isLoading) return <div>Chargement…</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Card className="shadow-md border-border/40">
        <CardHeader>
          {isUpdate ? (
            <div className="flex items-center gap-1 flex-1 mr-3">
              <Input
                type="text"
                defaultValue={workout.name}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleValidateName}
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
            <div className="flex items-center gap-1 flex-1 min-w-0 justify-between">
              <div className="flex">
                <CardTitle className="text-lg font-semibold truncate">
                  {workout.name}
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {}}
                className="text-muted-foreground hover:text-destructive transition"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
          <CardDescription>
            Organisez vos exercices, ajoutez des séries, suivez vos charges.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={(event) => {
              setExerciceActive(event.active.data.current.exercice);
            }}
          >
            <div className="space-y-6 mt-4">
              <SortableContext
                items={workout.exercices.map((ex) => ex.id)}
                strategy={verticalListSortingStrategy}
              >
                {workout.exercices?.length > 0 ? (
                  workout.exercices
                    .sort((a, b) => a.position - b.position)
                    .map((exercice) => (
                      <Exercice
                        key={exercice.id}
                        workoutId={id}
                        exercice={exercice}
                        id={exercice.id}
                      />
                    ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Aucun exercice pour le moment.
                  </p>
                )}
              </SortableContext>
              <DragOverlay>
                {activeExercice ? (
                  <Exercice
                    key={activeExercice.id}
                    workoutId={id}
                    exercice={activeExercice}
                    id={activeExercice.id}
                    isOverlay
                  />
                ) : null}
              </DragOverlay>
              <div className="flex justify-center pt-4">
                <CreateExercice workout={workout} />
              </div>
            </div>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
};
