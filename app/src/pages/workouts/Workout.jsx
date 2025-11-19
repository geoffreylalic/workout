import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWorkout } from "../../queries/workouts";
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

export const Workout = () => {
  const { workoutId } = useParams();
  const id = Number(workoutId);

  if (isNaN(id)) return <div>ID invalide</div>;

  const {
    data: workoutData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workouts", id],
    queryFn: () => getWorkout(id),
  });

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
          <div className="space-y-6 mt-4">
            {workoutData.exercices?.length > 0 ? (
              workoutData.exercices
                .sort((a, b) => a.position - b.position)
                .map((exercice) => (
                  <Exercice
                    key={exercice.id}
                    workoutId={id}
                    exercice={exercice}
                  />
                ))
            ) : (
              <p className="text-muted-foreground text-sm">
                Aucun exercice pour le moment.
              </p>
            )}

            {/* Bouton ajouter un exercice */}
            <div className="flex justify-center pt-4">
              <CreateExercice workout={workoutData} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
