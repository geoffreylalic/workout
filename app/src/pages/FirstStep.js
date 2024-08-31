import { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";

const FirstStep = (props) => {
  const { setExercicesName = () => {} } = props;
  const [exNum, setExNum] = useState(1);

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
            onChange={(evt) => {
              setExercicesName((prev) => ({
                ...prev,
                [index]: evt.target.value,
              }));
            }}
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
    </div>
  );
};

export default FirstStep;
