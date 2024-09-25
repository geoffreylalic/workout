import { Input, Typography } from "@material-tailwind/react";

const FirstStep = (props) => {
  const {
    setExercices = () => {},
    setWorkoutName = () => {},
    setSteps = () => {},
    exercices = [],
  } = props;

  const handleChangeExercices = (value, index) =>
    setExercices(exercices.map((ex, i) => (i === index ? value : ex)));

  const handleChangeNbExercices = (nb) => {
    const newExercices =
      nb > exercices.length ? [...exercices, ""] : exercices.slice(0, -1);
    setExercices(newExercices);
    setSteps(newExercices.length + 2);
  };

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
            onChange={(evt) =>
              handleChangeExercices(evt.target.value, index - 1)
            }
          />
        </div>
      );
    }
    return elements;
  };

  return (
    <div>
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
          onChange={(evt) => setWorkoutName(evt.target.value)}
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
          value={exercices.length}
          onChange={(evt) => handleChangeNbExercices(evt.target.value)}
        />
      </div>
      <div className="flex gap-4"></div>

      <div>{renderExcericesNames(exercices.length)}</div>
    </div>
  );
};

export default FirstStep;
