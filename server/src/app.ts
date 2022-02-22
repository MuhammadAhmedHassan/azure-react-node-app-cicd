import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import fs from "fs";
import path from "path";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

// app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(express.static(path.join(__dirname, "../build")));

fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
  const completePath = path.join(__dirname, "routes", file);
  if (!fs.lstatSync(completePath).isDirectory()) {
    app.use("/api", require("./routes/" + file).router);
  }
});
app.get("/api/ping", (req, res) => res.send("pong"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.all("*", async (_, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
