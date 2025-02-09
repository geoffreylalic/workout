import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import CustomInput from "./CustomInput";

const AddExercice = (props) => {
  const { setNewEx = () => {} } = props;
  const [exerciceName, setExerciceName] = useState();
  const [description, setDescription] = useState();

  return (
    <section>
      <Card className="h-full w-full mb-10">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
        >
          <Typography className="ml-" variant="h6">
            New exercice
          </Typography>
          <div className="flex">
            <Button
              variant="outlined"
              className="flex items-center gap-2 mr-1"
              disabled
              onClick={() => setNewEx(false)}
            >
              Validate
            </Button>
            <Button
              variant="outlined"
              className="flex items-center gap-2"
              onClick={() => setNewEx(false)}
            >
              Delete
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex ">
          <div className="mr-5">
            <CustomInput
              placeholder="Exerice name"
              setHandler={setExerciceName}
              value={exerciceName}
            />
          </div>
          <CustomInput
            placeholder="Exerice Description"
            setHandler={setDescription}
            value={description}
          />
        </CardBody>
      </Card>
    </section>
  );
};

export default AddExercice;
