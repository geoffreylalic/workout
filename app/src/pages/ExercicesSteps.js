import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";

const ExercicesSteps = (props) => {
  const { exercice, workoutId, setCurrentExercice } = props;
  console.log("🚀 ~ ExercicesSteps ~ workoutId:", workoutId);
  const [sets, setSets] = useState([{ reps: 0, rest: 0, weight: 0 }]);
  // create exercice here and sets here

  const addSet = () => {
    setSets([...sets, { reps: 0, rest: 0, weight: 0 }]);
  };

  const removeSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const handleChange = (attribute, i, value) => {
    setSets((prevSets) => {
      const newSets = prevSets.map((set, index) => {
        if (index === i) set[attribute] = value;
        return set;
      });
      setCurrentExercice({ name: exercice, sets: newSets, workoutId });
      return newSets;
    });
  };

  const renderRepsAndRest = () => {
    return sets.map((set, index) => (
      <div key={index} className="pt-3">
        <h1>{exercice}</h1>
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
              type="number"
              onChange={(evt) => {
                handleChange("reps", index, evt.target.value);
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
              type="number"
              onChange={(evt) => {
                handleChange("rest", index, evt.target.value);
              }}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              weight
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Weight"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              required
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              type="number"
              onChange={(evt) => {
                handleChange("weight", index, evt.target.value);
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

  return <div>{renderRepsAndRest()}</div>;
};

export default ExercicesSteps;
