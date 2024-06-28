import express from "express";
import { db } from "./connect-db";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app
  .listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error(
      "An error occured while starting the server, please check the logs for more details.",
      err
    );
    process.exit(1);
  });
