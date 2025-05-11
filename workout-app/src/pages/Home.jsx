import React from "react";
import { Button, Typography } from "@material-tailwind/react";
const Home = () => {
  return (
    <div className="pl-5">
      <div className="flex justify-between px-10 py-8">
        <div className="">
          <Typography className="text-2xl font-bold">Workouts</Typography>
        </div>
        <Button>Add workout</Button>
      </div>
    </div>
  );
};

export default Home;
