import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createWorkoutFn } from "../../queries/workouts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Outlet, useNavigate, useSearchParams } from "react-router";

export const CreateWorkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isDialogOpen = searchParams.get("create-workout", "true");

  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState("");
  const queryClient = useQueryClient();
  const mutationWorkout = useMutation({
    mutationFn: createWorkoutFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workouts", data.id] });
      navigate(`/workouts/${data.id}`);
    },
  });

  return (
    <>
      <main>
        <Outlet />
      </main>
      {isDialogOpen && (
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setSearchParams(searchParams.delete("create-workout"));
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle entrainement</DialogTitle>
              <DialogDescription>
                Ajouter le nom de votre nouvelle entrainement
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Nom de l'entrainement</FieldLabel>
                <Input
                  type="text"
                  placeholder="Workout name"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button
                className="mt-5"
                onClick={() => {
                  if (workoutName.trim()) {
                    mutationWorkout.mutate({ name: workoutName });
                  }
                }}
                disabled={!workoutName}
              >
                Validate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
