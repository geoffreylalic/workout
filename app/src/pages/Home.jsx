import { Button, Typography } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router";
import Workouts from "../components/Workouts";
import { VolumeChart } from "@/components/VolumeChart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
import { CardAnalytics } from "@/components/CardAnalytics";
import { useQuery } from "@tanstack/react-query";
import { getVolume } from "@/queries/dashboard";

const Home = () => {
  const analytics = ["workouts", "volume", "repeitions", "rest"];
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(
    dayjs().subtract(1, "week").toDate()
  );
  const [endDate, setEndDate] = useState(dayjs().toDate());
  const selectedRange = {
    from: startDate,
    to: endDate,
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: () =>
      getVolume(
        dayjs(startDate).format("YYYY-MM-DD"),
        dayjs(endDate).format("YYYY-MM-DD")
      ),
    queryKey: ["dashboard", startDate, endDate],
  });

  if (data) {
  }
  return (
    <div className="m-5">
      <div className="flex justify-between px-10 py-8">
        <div className="flex gap-5">
          <Typography className="text-2xl font-bold md-5">
            Suivi d’entraînement
          </Typography>
          <DatePicker
            selectedElement={selectedRange}
            onChange={(range) => {
              setStartDate(range.from);
              setEndDate(range.to);
            }}
            mode="range"
          />
        </div>
        <Button
          onClick={() => {
            searchParams.set("create-workout", "true");
            setSearchParams(searchParams);
          }}
        >
          Add workout
        </Button>
      </div>
      <div className="m-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          <CardAnalytics
            title="Number of workouts"
            value={data?.nbWorkout}
            isLoading={isLoading}
          />
          <CardAnalytics
            title="Average volume"
            value={`${data?.avgVolume} kg`}
            isLoading={isLoading}
          />
          <CardAnalytics
            title="Top workout"
            value={data?.topWorkout?.name}
            isLoading={isLoading}
          >
            {`${dayjs(data?.topWorkout?.createdAt)
              .toDate()
              .toLocaleDateString()} ${data?.topWorkout?.weight} kg`}
          </CardAnalytics>
        </div>
        <VolumeChart
          className="mb-5"
          startDate={dayjs(selectedRange.from).format("YYYY-MM-DD")}
          endDate={dayjs(selectedRange.to).format("YYYY-MM-DD")}
          isLoading={isLoading}
          isError={isError}
          data={data?.volume}
        />
        <Workouts />
      </div>
    </div>
  );
};

export default Home;
