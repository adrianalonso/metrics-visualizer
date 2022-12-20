import Measurement from "./measurement.enum";
import MetricRange from "./metric-range.enum";

export type GetMetricsResponse = Record<Measurement, Array<Metric>>;

interface MetricsRepository {
  get(range: MetricRange): Promise<GetMetricsResponse>;
}

export default MetricsRepository;
