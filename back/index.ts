// src/index.js
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { logger } from "./middlewares/logger";
import auth from "./routes/auth";
import workouts from "./routes/workouts";
import exercices from "./routes/exercices";
import sets from "./routes/sets";
import { authentication } from "./middlewares/auth";
import cors from "cors";

const env: String = process.env.ENV || "dev";
const envFile: string = `./.env.${env}`;
console.log("envFile", envFile);
dotenv.config({ path: envFile });

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger);
app.use((req: Request, res: Response, next: NextFunction) => {
  next();
}, cors({ maxAge: 84600 }));

app.use("/api/auth", auth);
app.use("/api/workouts", authentication, workouts);
app.use("/api/exercices", authentication, exercices);
app.use("/api/sets", authentication, sets);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
