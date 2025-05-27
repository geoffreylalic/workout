import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { putSetFn } from "../queries/set";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Set = ({ set, workoutId }) => {
  const [rep, setRep] = useState(set.repetitions);
  const [weight, setWeight] = useState(set.weight);
  const [rest, setRest] = useState(set.rest);
  const [isUpdate, setIsUpdate] = useState();

  const queryClient = useQueryClient();
  const mutationSet = useMutation({
    mutationFn: putSetFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workouts", workoutId],
      });
    },
  });
  return (
    <>
      <TableCell>
        <Input
          type="number"
          value={set.repetitions}
          onChange={(e) => {
            setRep(parseInt(e.target.value));
          }}
          placeholder="Repetitions"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={set.weight}
          onChange={(e) => {
            setWeight(parseInt(e.target.value));
          }}
          placeholder="Poids"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={set.rest}
          onChange={(e) => {
            setRest(parseInt(e.target.value));
          }}
          placeholder="Repos"
        />
      </TableCell>
      <Button
        onClick={() => {
          mutationSet.mutate({
            id: set.id,
            data: {
              repetitions: rep,
              weight,
              rest,
            },
          });
        }}
        className="center"
        disabled={!rep || !weight || !rest}
      >
        Modifier
      </Button>
    </>
  );
};

export default Set;
