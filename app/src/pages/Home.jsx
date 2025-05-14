import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="pl-5">
      <div className="flex justify-between px-10 py-8">
        <div className="">
          <Typography className="text-2xl font-bold">Workouts</Typography>
        </div>
        <Button onClick={() => navigate("/create-workout", { replace: true })}>
          Add workout
        </Button>
      </div>
      <div> TODO:Ajouter des stats lol</div>
    </div>
  );
};

export default Home;
