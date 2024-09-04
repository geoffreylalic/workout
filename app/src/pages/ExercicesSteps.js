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

  const handleInputChange = (index, field, value) => {
    setSets((prevSets) =>
      prevSets.map((set, i) => (i === index ? { ...set, [field]: value } : set))
    );
  };

  const addSet = () => {
    setSets([...sets, { reps: 0, rest: 0 }]);
  };

  const removeSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
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
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              required
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              value={set.reps}
              type="number"
              onChange={(evt) => {
                handleInputChange(index, "reps", evt.target.value);
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
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              required
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              value={set.rest}
              type="number"
              onChange={(evt) => {
                handleInputChange(index, "rest", evt.target.value);
              }}
            />
          </div>
          <Button className="m-3" onClick={addSet}>
            +
          </Button>
          {sets.length > 1 && (
            <Button className="m-3" onClick={() => removeSet(index)}>
              -
            </Button>
          )}
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
