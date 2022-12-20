import MetricRange from "../domain/metric-range.enum";
import MetricsRepository, {
  GetMetricsResponse,
} from "../domain/metrics.repository";

export default class GetMetricsUseCase {
  constructor(private readonly repository: MetricsRepository) {}

  async execute(range: MetricRange): Promise<GetMetricsResponse> {
    return this.repository.getMetrics(range);
  }
}
