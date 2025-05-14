import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkoutFn } from "../queries/workouts";
import { useState } from "react";

export function UpdateWorkoutDialog(props) {
  const { setOpen, open, element } = props;
  const queryClient = useQueryClient();
  const [data, setData] = useState();

  const mutation = useMutation({
    mutationFn: () => updateWorkoutFn(element["id"], { name: data }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      setOpen(false);
    },
  });

  if (element)
    return (
      <div>
        <Dialog size="sm" open={open} handler={setOpen} className="p-4">
          <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
              Update {element["name"]}
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
          <DialogBody>
            {" "}
            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="block font-medium mb-2"
                >
                  Workout name
                </Typography>
              </label>
              <Input
                id="name"
                color="gray"
                size="lg"
                name="name"
                defaultValue={element["name"]}
                onChange={(evt) => setData(evt.target.value)}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </DialogBody>
          <DialogFooter className="flex justify-center">
            <Button
              onClick={() => {
                mutation.mutate();
              }}
            >
              Confirm
            </Button>
            <Button className="bg-red-800 mr-5" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
}
