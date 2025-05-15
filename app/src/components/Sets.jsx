import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSetFn, getSet } from "../queries/set";

export const Sets = ({ exerciceId }) => {
  const [setId, setSetId] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: setData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["set", setId],
    queryFn: () => getSet(setId),
    enabled: !!setId,
  });

  const mutationSet = useMutation({
    mutationFn: createSetFn,
    onSuccess: (data) => {
      console.log("Série créé :", data);
      setSetId(data.id);
      queryClient.invalidateQueries({ queryKey: ["set", data.id] });
    },
  });

  console.log(setData, "set date");
  if (setData)
    return (
      <>
        <TableCell>
          <Input type="text" placeholder="Repetitions" />
        </TableCell>
        <TableCell>
          <Input type="text" placeholder="Poids" />
        </TableCell>
        <TableCell>
          <Input type="text" placeholder="Repos" />
        </TableCell>
      </>
    );

  return (
    <TableCell colSpan={3} className="py-3 text-center">
      <Button
        onClick={() => {
          mutationSet.mutate({ exerciceId: parseInt(exerciceId) });
        }}
      >
        Ajouter une série
      </Button>
    </TableCell>
  );
};
