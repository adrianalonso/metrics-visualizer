import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import GetMetricsUseCase from "../../application/get-metrics.usecase";
import { GetMetric } from "./dto/get-metrics.dto";

@Controller()
export class MetricsController {
  constructor(private readonly getMetricsUseCase: GetMetricsUseCase) {}

  @Get("/metrics/data")
  async getMetrics(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      })
    )
    query: GetMetric
  ): Promise<object> {
    return this.getMetricsUseCase.execute(query.range);
  }
}
