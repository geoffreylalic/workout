import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableCell, TableRow } from "./ui/table";
import Set from "./Set";
import { GripVerticalIcon } from "lucide-react";

export const RowSet = ({ id, set, workoutId, isOverlay, isEmpty }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { set } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  if (isEmpty) {
    return (
      <TableRow className="border-none">
        <TableCell
          colSpan={5}
          className="py-6 text-center text-sm text-muted-foreground italic"
        >
          Aucune série pour le moment — ajoutez-en une pour commencer.
        </TableCell>
      </TableRow>
    );
  }

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
