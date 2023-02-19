import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { router } from "./routes/api";
import * as bodyParser from "body-parser";
import { ConneToDB } from "./config/db";
import cors from "cors";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { clientSchema } from "./graphql/shema";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { GraphQLError } from "graphql";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
  })
);

// API Routes
app.use("/api", router);

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const server = createServer(app);

ConneToDB()
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: clientSchema,
      onConnect: (connectionParams: any, _webSocket: any): void => {
        if (connectionParams.Authorization) {
          return;
        }
        throw new GraphQLError(
          "You are not authorized to perform this action."
        );
      },
    },
    {
      server: server,
      path: "/subscriptions",
    }
  );
});
