import { TableCell } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteSetFn, putSetFn } from "../queries/set";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Pencil, Trash2 } from "lucide-react";
import { CellSet } from "./CellSet";

const Set = ({ set, workoutId }) => {
  const isNew =
    set.repetitions === null && set.weight === null && set.rest === null;

  const [rep, setRep] = useState(set.repetitions ?? "");
  const [weight, setWeight] = useState(set.weight ?? "");
  const [rest, setRest] = useState(set.rest ?? "");
  const [isUpdating, setIsUpdating] = useState(isNew);

  const queryClient = useQueryClient();

  const mutationUpdateSet = useMutation({
    mutationFn: putSetFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] }),
  });

  const mutationDeleteSet = useMutation({
    mutationFn: deleteSetFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] }),
  });

  const handleUpdate = () => {
    mutationUpdateSet.mutate({
      id: set.id,
      data: {
        repetitions: Number(rep),
        weight: Number(weight),
        rest: Number(rest),
      },
    });
    setIsUpdating(false);
  };

  const disableUpdate =
    mutationUpdateSet.isPending || rep === "" || weight === "" || rest === "";

  const editing = isUpdating || isNew;

  return (
    <>
      <CellSet
        type="number"
        value={rep}
        onChange={(e) => setRep(e.target.value)}
        placeholder="Répétitions"
        isUpdating={editing}
      />

      <CellSet
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Poids"
        isUpdating={editing}
      />

      <CellSet
        type="number"
        value={rest}
        onChange={(e) => setRest(e.target.value)}
        placeholder="Repos"
        isUpdating={editing}
      />

      <TableCell className="flex gap-2 justify-end">
        <Button
          onClick={() => {
            if (editing) handleUpdate();
            setIsUpdating(!isUpdating);
          }}
          disabled={disableUpdate}
          variant="outline"
          size="sm"
          className="flex items-center gap-1 px-3 py-1"
        >
          {mutationUpdateSet.isPending ? (
            <span className="animate-pulse">...</span>
          ) : editing ? (
            <Check className="h-5 w-5" />
          ) : (
            <Pencil className="h-5 w-5" />
          )}
        </Button>

        <Button
          onClick={() => mutationDeleteSet.mutate(set.id)}
          disabled={mutationDeleteSet.isPending}
          size="sm"
          className="flex items-center gap-1 px-3 py-1 hover:bg-red-600 hover:text-white"
        >
          {mutationDeleteSet.isPending ? (
            <span className="animate-pulse">...</span>
          ) : (
            <Trash2 className="h-5 w-5" />
          )}
        </Button>
      </TableCell>
    </>
  );
};

export default Set;
