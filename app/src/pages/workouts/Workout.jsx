import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWorkout, postExercicePositionsFn } from "../../queries/workouts";
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

export const Workout = () => {
  const { workoutId } = useParams();
  const id = Number(workoutId);
  const [activeExercice, setExerciceActive] = useState(null);
  const queryClient = useQueryClient();

  if (isNaN(id)) return <div>ID invalide</div>;

  const {
    data: workoutData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workouts", id],
    queryFn: () => getWorkout(id),
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
        id: workoutId,
        body: {
          exerciceId: active.data.current.exercice.id,
          position: over.data.current.sortable.index,
        },
      });
    }
  };

  if (isError) return <div>Erreur lors du chargement</div>;
  if (isLoading) return <div>Chargement…</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Card className="shadow-md border-border/40">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {workoutData.name}
          </CardTitle>
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
                items={workoutData.exercices.map((ex) => ex.id)}
                strategy={verticalListSortingStrategy}
              >
                {workoutData.exercices?.length > 0 ? (
                  workoutData.exercices
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
                <CreateExercice workout={workoutData} />
              </div>
            </div>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
};
