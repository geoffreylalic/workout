import { useQuery } from "@tanstack/react-query";
import { getWorkout } from "../../queries/workouts";
import { useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

import AddSet from "../../components/AddSet";
import LineSet from "../../components/LineSet";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const TABLE_HEAD = [
  {
    head: "Position",
    customeStyle: "text-left",
  },
  {
    head: "Répetitions",
    customeStyle: "text-right",
  },
  {
    head: "Weight",
    customeStyle: "text-right",
  },
  {
    head: "Rest",
    customeStyle: "text-right",
  },
  {
    head: "Actions",
    customeStyle: "text-right",
  },
];

const Workout = () => {
  const { workoutId } = useParams();
  const { data } = useQuery(getWorkout(workoutId));

  if (data) {
    const createdAt = new Date(data.createdAt).toLocaleString();
    return (
      <div className="m-10">
        <div className="pb-5">
          <Typography variant="h3" color="blue-gray">
            {data.name}
          </Typography>
          <Typography color="blue-gray">{createdAt}</Typography>
        </div>

        {data.exercices.length > 0 &&
          data.exercices?.map((exercice, index) => (
            <section key={"ex" + index}>
              <Card className="h-full w-full mb-10">
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none flex flex-wrap gap-4 justify-between mb-4"
                >
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {exercice.name}
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-gray-600 font-normal mt-1"
                    >
                      description
                    </Typography>
                  </div>
                  <Button
                    variant="outlined"
                    className="flex items-center gap-2"
                  >
                    Delete
                  </Button>
                </CardHeader>
                <CardBody className="">
                  <table className="w-full min-w-max table-auto">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map(({ head, customeStyle }) => (
                          <th
                            key={head}
                            className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle}`}
                          >
                            <Typography
                              color="blue-gray"
                              variant="small"
                              className="!font-bold"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {exercice.sets?.map(
                        (
                          { repetitions, weight, rest, exerciceId, id },
                          index
                        ) => (
                          <LineSet
                            exerciceId={exerciceId}
                            repetitions={repetitions}
                            weight={weight}
                            rest={rest}
                            index={index}
                            setId={id}
                            key={index}
                          />
                        )
                      )}
                      <AddSet exerciceId={exercice.id} />
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </section>
          ))}
        <div className="flex justify-center">
          <Button
            variant="text"
            size="sm"
            className="flex items-center"
            onClick={() => {}}
          >
            <div className="mr-1">Add exercices</div>
            <CheckCircleIcon className="w-5 h-5 text-gray-900" />
          </Button>
        </div>
      </div>
    );
  }
};

export default Workout;
