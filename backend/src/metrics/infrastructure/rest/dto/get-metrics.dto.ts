import { IsOptional, IsEnum } from "class-validator";
import MetricRange from "../../../domain/metric-range.enum";

export class GetMetric {
  @IsOptional()
  @IsEnum(MetricRange)
  public range: MetricRange = MetricRange.MINUTE;
}
