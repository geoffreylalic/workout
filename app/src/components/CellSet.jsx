import { Input } from "./ui/input";
import { TableCell } from "./ui/table";

export const CellSet = ({ type, value, onChange, placeholder, isUpdating }) => {
  return (
    <TableCell>
      {isUpdating ? (
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <div>{value}</div>
      )}
    </TableCell>
  );
};
