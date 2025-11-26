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
import { DatePicker } from "@/components/DatePicker";

export const CreateWorkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isDialogOpen = searchParams.has("create-workout");
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
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
            if (isDialogOpen) {
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
              <Field>
                <FieldLabel htmlFor="createdAt">
                  Date de l'entrainement
                </FieldLabel>
                <DatePicker
                  onChange={(date) => {
                    setCreatedAt(date);
                  }}
                  mode="single"
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button
                className="mt-5"
                onClick={() => {
                  if (workoutName.trim()) {
                    mutationWorkout.mutate({ name: workoutName, createdAt });
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
