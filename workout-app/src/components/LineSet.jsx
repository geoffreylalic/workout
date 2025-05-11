import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import EditSet from "./EditSet";
import { deleteSetFn, putSetFn } from "../queries/set";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function LineSet(props) {
  const { exerciceId, repetitions, weight, rest, index, setId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const classes = "!p-4 border-b border-gray-300";

  const queryClient = useQueryClient();

  const putSetMutation = useMutation({
    mutationFn: putSetFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["workouts", "exercices", "sets"],
      });
    },
  });

  const deleteSetMutation = useMutation({
    mutationFn: deleteSetFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["workouts", "exercices", "sets"],
      });
    },
  });

  if (isOpen) {
    return (
      <EditSet
        mutation={putSetMutation}
        exerciceId={exerciceId}
        setIsOpen={setIsOpen}
        setId={setId}
        mode="put"
      />
    );
  }

  if (!isOpen) {
    return (
      <tr key={"set" + index}>
        <td className={classes}>
          <Typography
            variant="small"
            className="!font-normal text-gray-600 text-left"
          >
            {index + 1}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            variant="small"
            className="!font-normal text-gray-600 text-right"
          >
            {repetitions}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            variant="small"
            className="!font-normal text-gray-600 text-right"
          >
            {weight}
          </Typography>
        </td>
        <td className={classes}>
          <Typography
            variant="small"
            className="!font-normal text-gray-600 text-right"
          >
            {rest}
          </Typography>
        </td>
        <td className={classes}>
          <div className="flex justify-end gap-4">
            <IconButton onClick={() => setIsOpen(true)}>
              <PencilIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              size="sm"
              onClick={() => deleteSetMutation.mutate(setId)}
            >
              <TrashIcon className="h-5 w-5 text-gray-900" />
            </IconButton>
          </div>
        </td>
      </tr>
    );
  }
}

export default LineSet;
