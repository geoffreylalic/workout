import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableCell, TableRow } from "./ui/table";
import Set from "./Set";
import { GripVerticalIcon } from "lucide-react";

export const RowSet = ({ id, set, workoutId, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { set } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    !isOverlay && (
      <TableRow
        ref={setNodeRef}
        style={style}
        {...attributes}
        key={id}
        className="border-muted/30"
      >
        <TableCell>
          <GripVerticalIcon {...listeners} className="h-5 w-5 cursor-grab" />
        </TableCell>
        <Set set={set} workoutId={workoutId} />
      </TableRow>
    )
  );
};
