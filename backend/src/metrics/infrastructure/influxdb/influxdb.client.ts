import { InfluxDB, QueryApi } from "@influxdata/influxdb-client";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
class InfluxDbClient {
  protected client: InfluxDB;
  protected url: string;
  protected token: string;
  protected organization: string;

  constructor(private configService: ConfigService) {
    this.url = this.configService.get<string>("influxdb.host") as string;
    this.token = this.configService.get<string>("influxdb.token") as string;
    this.organization = this.configService.get<string>(
      "influxdb.organization"
    ) as string;

    this.client = this.buildClient();
  }

  private buildClient(): InfluxDB {
    return new InfluxDB({ url: this.url, token: this.token });
  }

  getQueryApi(): QueryApi {
    return this.client.getQueryApi(this.organization);
  }
}

export default InfluxDbClient;
