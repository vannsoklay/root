import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routes/api";
import * as bodyParser from "body-parser";
import { ConneToDB } from './config/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use("/api", router);

ConneToDB()
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
