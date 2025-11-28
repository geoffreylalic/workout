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
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(
    dayjs().subtract(1, "week").toDate()
  );
  const [endDate, setEndDate] = useState(dayjs().toDate());
  const selectedRange = {
    from: startDate,
    to: endDate,
  };
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
        <VolumeChart
          startDate={dayjs(selectedRange.from).format("YYYY-MM-DD")}
          endDate={dayjs(selectedRange.to).format("YYYY-MM-DD")}
        />
        <Workouts />
      </div>
    </div>
  );
};

export default Home;
