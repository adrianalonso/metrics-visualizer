import { GetMetricsResponse } from "../../domain/metrics.repository";
import { Row } from "./influxdb-metrics.repository";

class InfluxDBGetMetricsMapper {
  public map(rows: Row[]): GetMetricsResponse {
    return rows.reduce((acc, row: Row) => {
      if (!acc[row._measurement]) {
        acc[row._measurement] = [];
      }
      acc[row._measurement].push(this.rowToMetric(row));

      return acc;
    }, {} as GetMetricsResponse);
  }

  private rowToMetric(row: Row): Metric {
    return {
      timestamp: new Date(row._time).getTime(),
      value: row._value,
    };
  }
}

export default InfluxDBGetMetricsMapper;
