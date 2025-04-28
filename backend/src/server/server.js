const server = require("..//index");
const connect = require("..//configs/db");
require("dotenv").config();
const port = process.env.PORT;
const numCpus = require("os").cpus().length;
const cluster = require("cluster");

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.id} died`);
  });
} else {
  server.listen(port, async (rs) => {
    await connect();
    console.log(`server is running on port ${port}`);
  });
}
