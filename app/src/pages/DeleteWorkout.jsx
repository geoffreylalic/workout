import Exercice from "@/components/Exercice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteExerciceFn, getExercice } from "@/queries/exercices";
import { deleteWorkoutFn, getWorkout } from "@/queries/workouts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router";

export const DeleteWorkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workoutId = searchParams.get("delete-workout");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: workout,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["workouts"],
    queryFn: () => getWorkout(workoutId),
    enabled: !!workoutId,
  });

  const mutationDeleteWorkout = useMutation({
    mutationFn: deleteWorkoutFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workouts"],
      });
    },
  });

  const handleDelete = () => {
    mutationDeleteWorkout.mutate(workoutId);
    navigate("/", { replace: true });
  };

  if (isLoading) {
    return <div>is loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  const nbSets = workout?.exercices?.reduce((acc, exercice) => {
    acc += exercice.sets.length;
    return acc;
  }, 0);

  return (
    <>
      <main>
        <Outlet />
      </main>
      {workoutId && (
        <Dialog
          open={workoutId}
          onOpenChange={(open) => {
            if (workoutId) {
              navigate(-1);
            }
          }}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-red-600">
                Supprimer l'entraînement
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-700">
                <p>
                  Êtes-vous sûr de vouloir supprimer l'entraînement{" "}
                  <strong>{workout.name}</strong> ?
                </p>
                <p className="mt-2 text-gray-800">
                  Cette action est <strong>irréversible</strong>.
                </p>
                <p className="mt-2">
                  Il contient <strong>{workout.exercices.length}</strong>{" "}
                  exercices enregistrés, pour un total de{" "}
                  <strong>{nbSets}</strong> séries.
                </p>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Annuler
              </Button>
              <Button
                className="bg-destructive hover:bg-red-700 text-white"
                onClick={handleDelete}
              >
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
