import dynamic from "next/dynamic";
import ResizableBox from "@components/ResizableBox";
import MetricRange from "@app/metrics/domain/metric-range.enum";
import useFetchMetrics from "@app/metrics/infrastructure/ui/dashboard/hooks/useFetchMetrics";
import { useMemo, useState } from "react";
import { AxisOptions, UserSerie } from "react-charts";
import style from "./style.module.scss";
import Button from "@components/Button";
import { GetMetricsResponse } from "@app/metrics/domain/metrics.repository";
import Measurement from "@app/metrics/domain/measurement.enum";

type Datum = {
  primary: Date;
  secondary: number;
};

const Chart = dynamic(
  () => import("react-charts").then((module) => module.Chart),
  { ssr: false }
);

const MetricChart = () => {
  const [range, setRange] = useState<MetricRange>(MetricRange.DAY);
  const { data: points, isLoading } = useFetchMetrics(range);

  const convertPointsToChartSeries = (
    data: GetMetricsResponse
  ): UserSerie<Datum>[] => {
    return Object.keys(data).map((m) => {
      const measurement = m as Measurement;
      const rows = data[measurement];
      return {
        label: measurement,
        data: rows.map((row: any) => ({
          primary: new Date(row.timestamp),
          secondary: row.value,
        })),
      };
    });
  };

  const data: UserSerie<Datum>[] = useMemo<UserSerie<Datum>[]>(
    () => convertPointsToChartSeries(points),
    [points]
  );

  const primaryAxis = useMemo<AxisOptions<Datum>>(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<Datum>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  const metrics = [MetricRange.DAY, MetricRange.HOUR, MetricRange.MINUTE];

  return (
    <>
      <div className={style.button_holder}>
        {metrics.map((metric) => (
          <Button
            key={metric}
            selected={metric === range}
            onClick={() => setRange(metric)}
          >
            {metric.toUpperCase()}
          </Button>
        ))}
      </div>
      {!isLoading && (
        <ResizableBox>
          <Chart
            options={{
              data,
              primaryAxis: primaryAxis as AxisOptions<unknown>,
              secondaryAxes: secondaryAxes as AxisOptions<unknown>[],
            }}
          />
        </ResizableBox>
      )}
    </>
  );
};

export default MetricChart;
