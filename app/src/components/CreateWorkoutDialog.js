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

export function CreateWorkoutDialog(props) {
  const { open, setOpen } = props;
  const [exercicesName, setExercicesName] = useState({ 0: "firstStep" });
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const renderExercicesBody = () => {
    // if (isLastStep || isFirstStep) return;
    return Object.entries(exercicesName).map(([key, value]) => {
      key = parseInt(key)
      return (
        activeStep === key + 1 && (
          <ExercicesSteps
            className="h-4 w-4"
            key={key}
            value={exercicesName[key + 1]}
          />
        )
      );
    });
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
              {Object.keys(exercicesName).map((exKey) => {
                return (
                  <Step
                    className="h-4 w-4"
                    onClick={() => {
                      setActiveStep(exKey);
                    }}
                  />
                );
              })}
            </Stepper>
          </div>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6 h-[42rem] overflow-y-scroll">
          {isFirstStep && <FirstStep setExercicesName={setExercicesName} />}
          {renderExercicesBody()}
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
