import Measurement from "./measurement.enum";
import Metric from "./metric";
import MetricRange from "./metric-range.enum";

export type GetMetricsResponse = Record<Measurement, Metric[]>;
interface MetricsRepository {
  getMetrics(range: MetricRange): Promise<GetMetricsResponse>;
}

export default MetricsRepository;
