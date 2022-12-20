import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { GetMetricsResponse } from "src/metrics/domain/metrics.repository";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/metrics/data (GET) 200 OK", async () => {
    const response = await request(app.getHttpServer())
      .get("/metrics/data")
      .expect(200);

    const payload = response.body as GetMetricsResponse;

    expect(payload["cpu"].length).toBeGreaterThan(0);
    expect(payload["mem"].length).toBeGreaterThan(0);
  });

  it("/metrics/data?range=hour (GET) 200 OK", async () => {
    const response = await request(app.getHttpServer())
      .get("/metrics/data?range=hour")
      .expect(200);

    const payload = response.body as GetMetricsResponse;

    expect(payload["cpu"].length).toBeGreaterThan(0);
    expect(payload["mem"].length).toBeGreaterThan(0);
  });

  it("/metrics/data (GET) 400 Bad Request", async () => {
    const response = await request(app.getHttpServer())
      .get("/metrics/data?range=fake")
      .expect(400);

    expect(response.body).toMatchInlineSnapshot(`
      Object {
        "error": "Bad Request",
        "message": Array [
          "range must be one of the following values: minute, hour, day",
        ],
        "statusCode": 400,
      }
    `);
  });
});
