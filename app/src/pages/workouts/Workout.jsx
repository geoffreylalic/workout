import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkoutFn, getWorkout } from "../../queries/workouts";
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
  const [workoutName, setWorkoutName] = useState("");

  const { workoutId } = useParams();

  const {
    data: workoutData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workouts", workoutId],
    queryFn: () => getWorkout(workoutId),
  });

  if (isError) return <div>error</div>;
  if (isLoading) return <div>Loading ..</div>;
  if (workoutData)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Créer un entrainement</CardTitle>
          <CardDescription>Créer votre entrainement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="m-5">
            <h1 className="mb-5 text-xl font-bold">{workoutData.name}</h1>

            {isLoading && <p>Chargement du workout...</p>}
            {isError && <p>Erreur lors du chargement du workout.</p>}
            <div>
              {workoutData &&
                workoutData?.exercices?.length > 0 &&
                workoutData?.exercices?.map((exercice, key) => (
                  <Exercice
                    workoutId={workoutId}
                    exercice={exercice}
                    key={key}
                  />
                ))}

              {workoutId && <CreateExercice workoutId={workoutId} />}
            </div>
          </div>
        </CardContent>
      </Card>
    );
};
