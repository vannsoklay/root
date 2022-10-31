import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { router } from "./routes/api";
import * as bodyParser from "body-parser";
import { ConneToDB } from './config/db';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

// API Routes
app.use("/api", router);

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

ConneToDB()
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
