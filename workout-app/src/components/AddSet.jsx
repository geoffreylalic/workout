import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { createSetFn } from "../queries/set";
import EditSet from "./EditSet";

function AddSet(props) {
  const { exerciceId } = props;
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const addSetMutation = useMutation({
    mutationFn: createSetFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["workouts", "exercices", "sets"],
      });
      console.log('response', response)
    },
    onError: (err) => {
      console.log({'err': err});
      
    }
  });

  const RenderAddButton = () => (
    <tr>
      <td colSpan={5} className="p-4" onClick={() => setIsOpen(true)}>
        <div className="flex justify-center">
          <PlusCircleIcon className="h-5 w-5 text-gray-900 " />
        </div>
      </td>
    </tr>
  );

  if (!isOpen) return <RenderAddButton />;
  if (isOpen)
    return (
      <EditSet
        mutation={addSetMutation}
        exerciceId={exerciceId}
        setIsOpen={setIsOpen}
        mode='create'
      />
    );
}

export default AddSet;
