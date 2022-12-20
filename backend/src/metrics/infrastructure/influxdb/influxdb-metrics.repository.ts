import { Injectable } from "@nestjs/common";
import MetricRange from "../../domain/metric-range.enum";
import MetricsRepository, {
  GetMetricsResponse,
} from "../../domain/metrics.repository";
import InfluxDbClient from "./influxdb.client";
import Measurement from "../../domain/measurement.enum";
import InfluxDBRangeQueryFactory from "./influxdb-range-query.factory";
import InfluxDBGetMetricsMapper from "./influxdb-metrics.mapper";

export type Row = {
  _time: string;
  _measurement: Measurement;
  _value: number;
};

@Injectable()
class InfluxDbMetricsRepository implements MetricsRepository {
  constructor(private readonly client: InfluxDbClient) {}

  async get(range: MetricRange): Promise<GetMetricsResponse> {
    const queryFactory = new InfluxDBRangeQueryFactory();
    const rows = await this.client
      .getQueryApi()
      .collectRows<Row>(queryFactory.buildQuery(range));

    return new InfluxDBGetMetricsMapper().map(rows);
  }
}

export default InfluxDbMetricsRepository;
