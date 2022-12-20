import MetricRange from "@app/metrics/domain/metric-range.enum";
import MetricsRepository, {
  GetMetricsResponse,
} from "@app/metrics/domain/metrics.repository";

class HttpMetricsRepository implements MetricsRepository {
  async getMetrics(range: MetricRange): Promise<GetMetricsResponse> {
    const response = await fetch(`/api/data?range=${range}`);
    const data = (await response.json()) as GetMetricsResponse;

    return data;
  }
}

export default HttpMetricsRepository;
