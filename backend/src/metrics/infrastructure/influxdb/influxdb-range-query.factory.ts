import MetricRange from "../../domain/metric-range.enum";

class InfluxDBRangeQueryFactory {
  buildQuery(range: MetricRange) {
    switch (range) {
      case MetricRange.DAY:
        return 'from(bucket:"metrics") |> range(start: -30d) |> group(columns: ["_measurement"]) |> aggregateWindow(every: 1d, fn: mean, createEmpty: false)|> yield(name: "mean")';
      case MetricRange.HOUR:
        return 'from(bucket:"metrics") |> range(start: -3d) |> group(columns: ["_measurement"]) |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)|> yield(name: "mean")';
      case MetricRange.MINUTE:
        return 'from(bucket:"metrics") |> range(start: -4h) |> group(columns: ["_measurement"])';
    }
  }
}

export default InfluxDBRangeQueryFactory;
