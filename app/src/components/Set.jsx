import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Set = ({ set }) => {
  return (
    <>
      <TableCell>
        <Input type="text" value={set.repetitions} placeholder="Repetitions" />
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

export default Set;
