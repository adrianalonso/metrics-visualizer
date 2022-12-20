import { useQuery } from "@tanstack/react-query";
import MetricRange from "@app/metrics/domain/metric-range.enum";
import HttpMetricsRepository from "@app/metrics/infrastructure/repository/http-metrics.repository";
import GetMetricsUseCase from "@app/metrics/application/get-metrics.usecase";
import { GetMetricsResponse } from "@app/metrics/domain/metrics.repository";

type UseFetchMetricsResponse = {
  data: GetMetricsResponse;
  isLoading: boolean;
};

const useFetchMetrics = (range: MetricRange): UseFetchMetricsResponse => {
  const { data, isLoading } = useQuery({
    queryKey: ["metrics", range],
    queryFn: () =>
      new GetMetricsUseCase(new HttpMetricsRepository()).execute(range),
  });

  return { data: data || { cpu: [], mem: [] }, isLoading };
};

export default useFetchMetrics;
