import { Input } from "@material-tailwind/react";
import React from "react";

const CustomInput = (props) => {
  const { placeholder, setHandler, value, isNumber } = props;
  return (
    <Input
      maxLength={isNumber ? 2 : 10000}
      placeholder={placeholder}
      className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-left"
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      type={isNumber ? "number" : "text"}
      onChange={(evt) => {
        setHandler(evt.target.value);
      }}
      value={value}
    />
  );
};

export default CustomInput;
