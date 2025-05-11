import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import CustomInput from "./CustomInput";

const EditSet = (props) => {
  const { mutation, exerciceId, setIsOpen, mode, setId } = props;
  const [position, setPostion] = useState(null);
  const [repetitions, setRepetitions] = useState(null);
  const [weight, setWeight] = useState(null);
  const [rest, setRest] = useState(null);

  const RenderCheckIcon = () => {
    if (position && repetitions && weight && rest) {
      return (
        <IconButton
          variant="text"
          size="sm"
          onClick={() => {
            mutation.mutate(
              mode === "create"
                ? {
                    repetitions: parseInt(repetitions),
                    weight: parseInt(weight),
                    rest: "23:00",
                    exerciceId: exerciceId,
                  }
                : mode === "put"
                ? {
                    repetitions: parseInt(repetitions),
                    weight: parseInt(weight),
                    rest: "10:00",
                    id: setId,
                  }
                : null
            );
            setIsOpen(false);
          }}
        >
          <CheckIcon className="h-5 w-5 text-gray-900" />
        </IconButton>
      );
    }
  };

  return (
    <tr>
      <td className="p-4">
        <CustomInput
          placeholder="Position"
          setHandler={setPostion}
          value={position}
        />
      </td>
      <td className="p-4">
        <CustomInput
          placeholder="Répétitions"
          setHandler={setRepetitions}
          value={repetitions}
        />
      </td>
      <td className="p-4">
        <CustomInput
          placeholder="Weight"
          setHandler={setWeight}
          value={weight}
        />
      </td>
      <td className="p-4">
        <CustomInput placeholder="Rest" setHandler={setRest} value={rest} />
      </td>
      <td className="p-4">
        <div className="flex justify-center gap-4">
          <RenderCheckIcon />
          <IconButton
            variant="text"
            size="sm"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <XMarkIcon className="h-5 w-5 text-gray-900" />
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export default EditSet;
