import { CheckIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Input } from "@material-tailwind/react";
import React, { useState } from "react";

function AddSet(props) {
  const { exerciceId } = props;
  const [isAdded, setIsAdded] = useState(false);
  const [position, setPostion] = useState(null);
  const [repetitions, setRepetitions] = useState(null);
  const [weight, setWeight] = useState(null);
  const [rest, setRest] = useState(null);
  const RenderAddButton = () => (
    <tr>
      <td
        colSpan={5}
        className="p-4"
        onClick={() => setIsAdded(true)}
      >
        <div className="flex justify-center">
          <PlusCircleIcon className="h-5 w-5 text-gray-900 " />
        </div>
      </td>
    </tr>
  );

  const CutstomInput = (props) => {
    const { placeholder, setHandler, value } = props;
    return (
      <Input
        maxLength={2}
        placeholder={placeholder}
        className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-left"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        type="number"
        onChange={(evt) => {
          setHandler(evt.target.value);
        }}
        value={value === null ? "" : value}
      />
    );
  };

  const RenderCheckIcon = () => {
    if (position && repetitions && weight && rest) {
      return (
        <IconButton
          variant="text"
          size="sm"
          onClick={() => {
            setIsAdded(false);
          }}
        >
          <CheckIcon className="h-5 w-5 text-gray-900" />
        </IconButton>
      );
    }
  };

  const RenderEditSet = () => (
    <tr>
      <td className="p-4">
        <CutstomInput
          placeholder="Position"
          setHandler={setPostion}
          value={position}
        />
      </td>
      <td className="p-4">
        <CutstomInput
          placeholder="Répétitions"
          setHandler={setRepetitions}
          value={repetitions}
        />
      </td>
      <td className="p-4">
        <CutstomInput
          placeholder="Weight"
          setHandler={setWeight}
          value={weight}
        />
      </td>
      <td className="p-4">
        <CutstomInput placeholder="Rest" setHandler={setRest} value={rest} />
      </td>
      <td className="p-4">
        <div className="flex justify-center gap-4">
          <RenderCheckIcon />
          <IconButton
            variant="text"
            size="sm"
            onClick={() => {
              setIsAdded(false);
            }}
          >
            <TrashIcon className="h-5 w-5 text-gray-900" />
          </IconButton>
        </div>
      </td>
    </tr>
  );

  if (!isAdded) return <RenderAddButton />;
  if (isAdded) return <RenderEditSet />;
}

export default AddSet;
