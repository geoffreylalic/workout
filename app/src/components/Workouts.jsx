import { getWorkouts } from "../queries/workouts";
import { useQuery } from "@tanstack/react-query";
import WorkoutsTable from "./tables/WorkoutsTable";

const columns = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "Créé à",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
];

const Workouts = () => {
  const {
    data: workoutsData = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });

  if (isLoading) return <div>Is loading</div>;
  if (isError) {
    console.log(error);
    
    return <div>Is error</div>;
  }

  return <WorkoutsTable data={workoutsData} columns={columns} />;
};

export default Workouts;
