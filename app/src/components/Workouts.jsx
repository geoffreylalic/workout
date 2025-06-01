import { getWorkouts } from "../queries/workouts";
import { useQuery } from "@tanstack/react-query";
import WorkoutsTable from "./tables/WorkoutsTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";

const Workouts = () => {
  const {
    data: workoutsData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });

  const navigate = useNavigate();

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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        console.log(row);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=> navigate(`/workouts/${row.id}`)} >Modifier</DropdownMenuItem>
              <DropdownMenuItem>Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) return <div>Is loading</div>;
  if (isError) {
    console.log(error);

    return <div>Is error</div>;
  }

  return <WorkoutsTable data={workoutsData} columns={columns} />;
};

export default Workouts;
