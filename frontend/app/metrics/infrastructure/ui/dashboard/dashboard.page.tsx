import { useMemo, useState } from "react";
import { AxisOptions } from "react-charts";

import Title from "@components/Title";
import style from "./dashboard.module.scss";
import MetricChart from "./components/MetricChart";

export const Dashboard = () => {
  return (
    <main className={style.main}>
      <Title
        title="Timeline Series Demo"
        description="This is an example of timeline series demo app to Factorial.co challenge"
      />
      <MetricChart />
    </main>
  );
};

export default Dashboard;
