type Config = {
  port: number;
  influxdb: {
    host: string;
    token: string;
    organization: string;
  };
};

export default (): Config => ({
  port: parseInt(process.env.PORT as string, 10) || 8080,
  influxdb: {
    host: process.env.INFLUX_DB_HOST || "http://localhost:8086",
    token: process.env.INFLUX_DB_TOKEN || "s3cr3t",
    organization: process.env.INFLUX_DB_ORGANIZATION || "factorial",
  },
});
