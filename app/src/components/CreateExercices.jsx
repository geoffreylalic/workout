import {
  Button,
  Dialog,
  Typography,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";

export function CreateExercicesDialog(props) {
  const { setOpen, open, workout } = props;
  const [data, setData] = useState();
  const templateExercice = {
    exerciceName: "",
    sets: [
      {
        repetition: 0,
        weight: 0,
        time: 0,
      },
    ],
  };
  const [exercices, setExercices] = useState([templateExercice]);

  // const mutation = useMutation({
  //   mutationFn: () => updateWorkoutFn(element["id"], { name: data }),
  //   onSuccess: (response) => {
  //     queryClient.invalidateQueries({ queryKey: ["workouts"] });
  //     setOpen(false);
  //   },
  // });

  return (
    <div>
      <Dialog size="m" open={open} handler={setOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add exercice in {workout["name"]}
          </Typography>
          <Button
            className="!absolute right-3.5 top-3.5"
            onClick={() => {
              setExercices((exercices) => [...exercices, templateExercice]);
            }}
          >
            Add exercice
          </Button>
        </DialogHeader>
        <DialogBody className="pace-y-4 pb-6 h-[42rem] overflow-y-scroll">
          {exercices.map((el, index) => (
            <div key={index} className="pb-7">
              {exercices.length > 1 && index !== 0 && (
                <div class="border-t-2 w-11/12 mx-auto pb-3"></div>
              )}
              <h1>Exercice {index + 1}</h1>
              <div className="ml-5">
                <label>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Name
                  </Typography>
                </label>
                <Input
                  id="name"
                  color="gray"
                  size="lg"
                  name="name"
                  // defaultValue={element["name"]}
                  onChange={(evt) => setData(evt.target.value)}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div className="ml-10">
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Repetition
                  </Typography>
                </label>
                <Input
                  id="name"
                  color="gray"
                  size="lg"
                  name="name"
                  // defaultValue={element["name"]}
                  onChange={(evt) => setData(evt.target.value)}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                />
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Weight
                  </Typography>
                </label>
                <Input
                  id="name"
                  color="gray"
                  size="lg"
                  name="name"
                  // defaultValue={element["name"]}
                  onChange={(evt) => setData(evt.target.value)}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                />
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Rest
                  </Typography>
                </label>
                <Input
                  id="name"
                  color="gray"
                  size="lg"
                  name="name"
                  // defaultValue={element["name"]}
                  onChange={(evt) => setData(evt.target.value)}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>
          ))}
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            onClick={() => {
              // mutation.mutate();
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
