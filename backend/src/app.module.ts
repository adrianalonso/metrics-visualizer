import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MetricsModule } from "./metrics/infrastructure/framework/metrics.module";
import configuration from "./configuration";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MetricsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
