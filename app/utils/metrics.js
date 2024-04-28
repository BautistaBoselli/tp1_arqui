import StatsD from "hot-shots";

export const metrics = new StatsD({
  host: "graphite",
  port: 8125,
  prefix: "myapp.",
  errorHandler: (error) => {
    console.log("ERROR LOGUEANDO STATS");
    console.error(error);
  },
});

export async function measureExecution(metricName, cb) {
  const start = process.hrtime.bigint();
  try {
    const result = await cb();
    return result;
  } catch (error) {
    throw error;
  } finally {
    const end = process.hrtime.bigint();
    metrics.gauge(metricName, Number(end - start) / 1_000_000);
  }
}
