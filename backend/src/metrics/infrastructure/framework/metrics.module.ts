import { Module } from "@nestjs/common";
import { MetricsController } from "../../infrastructure/rest/metrics.controller";
import InfluxDbMetricsRepository from "../influxdb/influxdb-metrics.repository";
import GetMetricsUseCase from "../../application/get-metrics.usecase";
import InfluxDbClient from "../influxdb/influxdb.client";
import MetricsProviders from "./metrics.providers";

@Module({
  imports: [],
  controllers: [MetricsController],
  providers: [
    GetMetricsUseCase,
    {
      provide: MetricsProviders.METRICS_REPOSITORY,
      useClass: InfluxDbMetricsRepository,
    },
    InfluxDbClient,
  ],
})
export class MetricsModule {}
