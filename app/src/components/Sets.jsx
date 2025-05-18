import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSetFn, getSet } from "../queries/set";

export const Sets = ({ set }) => {
  if (set)
    return (
      <>
        <TableCell>
          <Input
            type="text"
            value={set.repetitions}
            placeholder="Repetitions"
          />
        </TableCell>
        <TableCell>
          <Input type="text" value={set.weight} placeholder="Poids" />
        </TableCell>
        <TableCell>
          <Input type="text" value={set.rest} placeholder="Repos" />
        </TableCell>
      </>
    );
};
