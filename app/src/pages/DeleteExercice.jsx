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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router";

export const DeleteExercice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const exerciceId = searchParams.get("delete-exercice");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: exercice,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["exercice"],
    queryFn: () => getExercice(exerciceId),
    enabled: !!exerciceId,
  });

  const mutationDeleteExercice = useMutation({
    mutationFn: deleteExerciceFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workouts", exercice.workoutId],
      });
    },
  });

  const handleDelete = () => {
    mutationDeleteExercice.mutate(exercice.id);
    navigate(-1);
  };

  if (isLoading) {
    return <div>is loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      <main>
        <Outlet />
      </main>
      {exerciceId && (
        <Dialog
          open={exerciceId}
          onOpenChange={(open) => {
            if (exerciceId) {
              navigate(-1);
            }
          }}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Supprimer l'exercice</DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-700">
                Êtes-vous sûr de vouloir supprimer l'exercice{" "}
                <strong>{exercice.name}</strong> ? Cette action est
                irréversible.
              </DialogDescription>
            </DialogHeader>

            <Exercice
              key={exercice.id}
              workoutId={exercice.workoutId}
              exercice={exercice}
              id={exercice.id}
              isPreview
            />

            <DialogFooter className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Annuler
              </Button>
              <Button
                className="bg-destructive text-white"
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
