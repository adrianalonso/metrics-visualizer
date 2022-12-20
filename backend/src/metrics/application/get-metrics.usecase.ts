import { Inject, Injectable } from "@nestjs/common";
import MetricRange from "../domain/metric-range.enum";
import MetricsRepository, {
  GetMetricsResponse,
} from "../domain/metrics.repository";
import MetricsProviders from "../infrastructure/framework/metrics.providers";

@Injectable()
class GetMetricsUseCase {
  constructor(
    @Inject(MetricsProviders.METRICS_REPOSITORY)
    private readonly repository: MetricsRepository
  ) {}

  public execute(range: MetricRange): Promise<GetMetricsResponse> {
    return this.repository.get(range);
  }
}

export default GetMetricsUseCase;
