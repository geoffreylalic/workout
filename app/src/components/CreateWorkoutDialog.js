import React, { useState } from "react";
import {
  Input,
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

const renderExcericesNames = (exNum) => {
  const elements = [];
  for (let index = 1; index <= exNum; index++) {
    elements.push(
      <div key={index} className="pt-3">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-2 text-left font-medium"
        >
          Exercise #{index}
        </Typography>
        <Input
          color="gray"
          size="lg"
          placeholder={`Exercise #${index}`}
          name="name"
          className="placeholder:opacity-100 focus:!border-t-gray-900"
          required
          containerProps={{
            className: "!min-w-full",
          }}
          labelProps={{
            className: "hidden",
          }}
        />
      </div>
    );
  }
  return elements;
};

export function CreateWorkoutDialog(props) {
  const { open, setOpen } = props;

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [exNum, setExNum] = useState(1);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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
              <Step className="h-4 w-4" onClick={() => setActiveStep(0)} />
              <Step className="h-4 w-4" onClick={() => setActiveStep(1)} />
              <Step className="h-4 w-4" onClick={() => setActiveStep(2)} />
            </Stepper>
          </div>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6 h-[42rem] overflow-y-scroll">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. White Shoes"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              required
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              How many exercices?
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. White Shoes"
              name="name"
              type="number"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              required
              value={exNum}
              onChange={(evt) => setExNum(evt.target.value)}
            />
          </div>
          <div className="flex gap-4"></div>

          <div>{renderExcericesNames(exNum)}</div>
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
