import { Button, Typography } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router";
import Workouts from "../components/Workouts";
import { VolumeChart } from "@/components/VolumeChart";
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="m-5">
      <div className="flex justify-between px-10 py-8">
        <div className="">
          <Typography className="text-2xl font-bold">Workouts</Typography>
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
        <VolumeChart />
        <Workouts />
      </div>
    </div>
  );
};

export default Home;
