import React, { useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Stepper,
  Step,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FirstStep from "../pages/FirstStep";
import ExercicesSteps from "../pages/ExercicesSteps";
import LastStep from "../pages/LastStep";
import { useMutation } from "@tanstack/react-query";
import { createWorkoutFn } from "../queries/workouts";
import { createExerciceWithSetsFn } from "../queries/exercices";

export function CreateWorkoutDialog(props) {
  const { setOpen, open } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutId, setWorkoutId] = useState(null);
  const [exercices, setExercices] = useState([]);
  const [currentExercice, setCurrentExercice] = useState(null);
  const [steps, setSteps] = useState(2);

  const workoutMutation = useMutation({
    mutationFn: createWorkoutFn,
    onSuccess: (response) => {
      setWorkoutId(response.data.id);
    },
  });

  const exerciceMutation = useMutation({
    mutationFn: createExerciceWithSetsFn,
    onSuccess: () => {
      setCurrentExercice(null);
    },
  });

  const handleNext = () => {
    if (isFirstStep) {
      workoutMutation.mutate({ name: workoutName });
    }

    !isLastStep && setActiveStep((cur) => cur + 1);

    if (currentExercice) {
      console.log(currentExercice, "ok");

      exerciceMutation.mutate(currentExercice);
    }
  };
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const renderSteppers = () => {
    let res = [];
    for (let index = 0; index < steps; index++) {
      res.push(<Step key={index} className="h-4 w-4" />);
    }
    return res;
  };

  const renderExercicesBody = () => {
    return exercices.map(
      (value, key) =>
        key + 1 === activeStep && (
          <ExercicesSteps
            className="h-4 w-4"
            key={key}
            exercice={value}
            workoutId={workoutId}
            setCurrentExercice={setCurrentExercice}
          />
        )
    );
  };

  return (
    <>
      <Dialog size="sm" open={open} handler={setOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add a workout session
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={() => setOpen(!open)}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
          <div className="w-full py-4 px-8">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              {renderSteppers()}
            </Stepper>
          </div>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6 h-[42rem] overflow-y-scroll">
          {isFirstStep && (
            <FirstStep
              setSteps={setSteps}
              setExercices={setExercices}
              exercices={exercices}
              setWorkoutName={setWorkoutName}
            />
          )}
          {isLastStep && <LastStep />}
          {!isFirstStep && !isLastStep && renderExercicesBody()}
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
