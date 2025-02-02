import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

function AddSet() {
  const [isAdded, setIsAdded] = useState(false);
  const RenderAddButton = () => (
    <tr>
      <td
        colSpan={5}
        className="bg-blue-gray-500 !p-4"
        onClick={() => setIsAdded(true)}
      >
        <div className="flex justify-center">
          <PlusIcon className="h-5 w-5 text-gray-900 " />
        </div>
      </td>
    </tr>
  );

  const CutstomInput = (props) => {
    const { placeholder } = props;
    return (
      <Input
        maxLength={2}
        placeholder={placeholder}
        pattern="^\+\d{1,3}\s\d{1,4}-\d{1,4}-\d{4}$"
        className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-left"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        type="number"
      />
    );
  };

  const RenderEditSet = () => (
    <tr>
      <td className="p-4">
        <CutstomInput placeholder="Position" />
      </td>
      <td className="p-4">
        <CutstomInput placeholder="Répétitions" />
      </td>
      <td className="p-4">
        <CutstomInput placeholder="Weight" />
      </td>
      <td className="p-4">
        <CutstomInput placeholder="Rest" />
      </td>
      <td className="p-4">
        <div className="flex justify-end gap-4">
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
