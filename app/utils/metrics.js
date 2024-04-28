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
