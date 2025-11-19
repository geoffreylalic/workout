import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableCell, TableRow } from "./ui/table";
import Set from "./Set";
import { GripVerticalIcon } from "lucide-react";

export const RowSet = ({ id, set, workoutId }) => {
  const { attributes, listeners, setNodeRef, transform, transition, } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
      key={id}
      className="border-muted/30"
    >
      <TableCell>
        <GripVerticalIcon {...listeners} />
      </TableCell>
      <Set set={set} workoutId={workoutId} />
    </TableRow>
  );
};
