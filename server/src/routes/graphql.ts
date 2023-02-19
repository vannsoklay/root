import express from "express";
import dotenv from "dotenv";
import CheckAuth from "../middleware/check-auth";
import { Permission } from "../middleware/permission";
import { graphqlHTTP } from "express-graphql";
import { clientSchema, adminSchema } from "../graphql/shema";
import { verifyUser } from "../middleware/verify-user";

dotenv.config();

export const graphqlRoute = express.Router();

const subscriptionsEndpoint = `ws://localhost:${process.env.PORT}/subscriptions`;
graphqlRoute.post(
  "/admin",
  CheckAuth,
  Permission("ADMIN"),
  graphqlHTTP( async (res) => ({
    schema: adminSchema,
    graphiql: { subscriptionEndpoint: subscriptionsEndpoint } as any,
    context: await verifyUser(res.headers.authorization) 
  }))
);

graphqlRoute.post(
  "/graphql",
  CheckAuth,
  Permission("USER"),
  graphqlHTTP( async (res) => ({
    schema: clientSchema,
    graphiql: { subscriptionEndpoint: subscriptionsEndpoint } as any,
    context: await verifyUser(res.headers.authorization) 
  }))
);
