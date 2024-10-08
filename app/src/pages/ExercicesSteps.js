import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";

const ExercicesSteps = (props) => {
  const { exercice, workoutId, setCurrentExercice } = props;
  const [sets, setSets] = useState([{ repetitions: 0, rest: 0, weight: 0 }]);
  // create exercice here and sets here

  const addSet = () => {
    setSets([...sets, { repetitions: 0, rest: 0, weight: 0 }]);
  };

  const removeSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const handleChange = (attribute, i, value) => {
    setSets((prevSets) => {
      const newSets = prevSets.map((set, index) => {
        if (attribute === "rest") {
          value = value === "" ? 0 : value;
          const rest = parseInt(value);
          let minutes = Math.floor(rest / 60);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          let seconds = rest % 60;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          value = "" + minutes + ":" + seconds;
        }
        value =
          attribute === "repetitions" || attribute === "weight"
            ? parseInt(value)
            : value;
        if (index === i) set[attribute] = value;
        return set;
      });
      setCurrentExercice({
        name: exercice,
        sets: newSets,
        workoutId: workoutId,
      });
      return newSets;
    });
  };

  const renderRepetitionsAndRest = () => {
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
              repetitions
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="repetitions"
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
                handleChange("repetitions", index, evt.target.value);
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
              Weight
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

  return <div>{renderRepetitionsAndRest()}</div>;
};

export default ExercicesSteps;
