import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import Workouts from "../components/Workouts";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="m-5">
      <div className="flex justify-between px-10 py-8">
        <div className="">
          <Typography className="text-2xl font-bold">Workouts</Typography>
        </div>
        <Button onClick={() => navigate("/create-workout", { replace: true })}>
          Add workout
        </Button>
      </div>
      <div className="m-5">
        <Workouts />
      </div>
    </div>
  );
};

export default Home;
