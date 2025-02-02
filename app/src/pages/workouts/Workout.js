import { useQuery } from "@tanstack/react-query";
import { getWorkout } from "../../queries/workouts";
import { useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
} from "@material-tailwind/react";

import {
  DocumentMagnifyingGlassIcon,
  FlagIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import AddSet from "../../components/AddSet";

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
              <Card className="h-full w-full">
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
                <CardBody className="overflow-scroll !px-0 py-2">
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
                        ({ repetitions, weight, rest }, index) => {
                          const classes = "!p-4 border-b border-gray-300";
                          return (
                            <tr key={"set" + index}>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="!font-normal text-gray-600 text-left"
                                >
                                  {index + 1}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="!font-normal text-gray-600 text-right"
                                >
                                  {repetitions}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="!font-normal text-gray-600 text-right"
                                >
                                  {weight}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  className="!font-normal text-gray-600 text-right"
                                >
                                  {rest}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <div className="flex justify-end gap-4">
                                  <IconButton variant="text" size="sm">
                                    <TrashIcon className="h-5 w-5 text-gray-900" />
                                  </IconButton>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                      <AddSet exerciceId={exercice.id}/>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </section>
          ))}
      </div>
    );
  }
};

export default Workout;
