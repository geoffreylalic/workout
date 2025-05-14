import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkoutFn } from "../queries/workouts";

export function DeleteDialog(props) {
  const { setOpen, open, element, elementType } = props;
  const queryClient = useQueryClient();

  const fctDelete =
    elementType === "workouts" ? () => deleteWorkoutFn(element["id"]) : null;

  const mutation = useMutation({
    mutationFn: fctDelete,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [elementType, element["id"]] });
      setOpen(false);
      window.location.reload();
    },
  });

  if (!elementType) {
    return <div>Ya un bug mon amie</div>;
  }

  if (elementType === "workouts")
    return (
      <div>
        <Dialog size="sm" open={open} handler={setOpen} className="p-4">
          <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
              Are you sure to delete the workout ?
            </Typography>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute right-3.5 top-3.5"
              onClick={() => setOpen(!open)}
            >
              <XMarkIcon className="h-4 w-4 stroke-2" />
            </IconButton>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <Button
              className="bg-red-800 mr-5"
              onClick={() => {
                mutation.mutate();
              }}
            >
              Yes
            </Button>
            <Button>No</Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
}
