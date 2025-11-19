import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSetFn } from "../queries/set";

const CreateSet = ({ workoutId, exercice }) => {
  const queryClient = useQueryClient();

  const mutationSet = useMutation({
    mutationFn: createSetFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workouts", workoutId],
        refetchType: "active",
      });
    },
  });
  return (
    <TableCell colSpan={5} className="py-3 text-center">
      <Button
        onClick={() => {
          mutationSet.mutate({
            exerciceId: exercice.id,
            position: exercice.sets.length,
          });
        }}
      >
        Ajouter une série
      </Button>
    </TableCell>
  );
};

export default CreateSet;
