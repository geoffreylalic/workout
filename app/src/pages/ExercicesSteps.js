import { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

const ExercicesSteps = (props) => {
  const { value } = props;
  const [sets, setSets] = useState([
    {
      reps: 0,
      rest: 0,
    },
  ]);

  const handleChange = (index, field  , value) => {
    setSets((prevSets) =>
      prevSets.map((set, i) => (i === index ? { ...set, [field]: value } : set))
    );
  };

  const renderRepsAndRest = () => {
    return sets.map((set, index) => (
      <div key={index} className="pt-3">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-2 text-left font-medium"
        >
          Set #{index + 1}
        </Typography>
        <div className="flex justify-between align-bottom">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Reps
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Reps"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              required
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              onChange={(evt) => {
                handleChange(index, "reps", evt.target.value);
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Rest
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Rest"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              required
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              onChange={(evt) => {
                handleChange(index, "rest", evt.target.value);
              }}
            />
          </div>
          <Button
            className="m-3"
            onClick={setSets([...sets, { reps: 0, rest: 0 }])}
          >
            +
          </Button>
          <Button className="m-3">-</Button>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <h1>{value}</h1>
      {renderRepsAndRest()}
    </div>
  );
};

export default ExercicesSteps;
