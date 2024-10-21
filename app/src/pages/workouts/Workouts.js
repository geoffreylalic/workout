import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getWorkouts } from "../../queries/workouts";

import Calendar from "../../components/Calendar";
import { Table } from "../../components/Table";

const Workouts = () => {
  const { data, error } = useQuery(getWorkouts);
  const handleAdd = () => {};
  if (error) {
    console.error(error);
  }

  if (data) {
    return (
      <div className="pl-5 pt-5">
        <div className="justify-between grid grid-cols-5 gap-10"></div>
        {/* <Calendar addName="add workout  " onClickAdd={handleAdd} /> */}
        <Table
          data={data}
          attributes={["name", "createdAt", "id"]}
          headers={["name", "Date creation", "id", "action"]}
          view="id"
        />
      </div>
    );
  }
};

export default Workouts;
