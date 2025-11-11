import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteSetFn, putSetFn } from "../queries/set";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Set = ({ set, workoutId }) => {
  const [rep, setRep] = useState(set.repetitions ?? "");
  const [weight, setWeight] = useState(set.weight ?? "");
  const [rest, setRest] = useState(set.rest ?? "");

  const queryClient = useQueryClient();

  const mutationUpdateSet = useMutation({
    mutationFn: putSetFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] });
    },
  });

  const mutationDeleteSet = useMutation({
    mutationFn: deleteSetFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", workoutId] });
    },
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
  };

  return (
    <>
      <TableCell>
        <Input
          type="number"
          value={rep}
          onChange={(e) => setRep(e.target.value)}
          placeholder="Répétitions"
        />
      </TableCell>

      <TableCell>
        <Input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Poids"
        />
      </TableCell>

      <TableCell>
        <Input
          type="number"
          value={rest}
          onChange={(e) => setRest(e.target.value)}
          placeholder="Repos"
        />
      </TableCell>

      <TableCell className="flex gap-2 justify-end">
        <Button
          onClick={handleUpdate}
          disabled={
            mutationUpdateSet.isPending ||
            rep === "" ||
            weight === "" ||
            rest === ""
          }
        >
          {mutationUpdateSet.isPending ? "..." : "Modifier"}
        </Button>

        <Button
          onClick={() => mutationDeleteSet.mutate(set.id)}
          disabled={mutationDeleteSet.isPending}
        >
          {mutationDeleteSet.isPending ? "..." : "Supprimer"}
        </Button>
      </TableCell>
    </>
  );
};

export default Set;
