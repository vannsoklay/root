import express from 'express';
import dotenv from "dotenv";
import CheckAuth from '../middleware/check-auth';
import { Permission } from '../middleware/permission';
import { graphqlHTTP } from 'express-graphql';
import { clientSchema, adminSchema } from '../graphql/shema';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

dotenv.config();

export const graphqlRoute = express.Router();

const subscriptionsEndpoint = `ws://localhost:${process.env.PORT}/subscriptions`;
graphqlRoute.post("/admin", CheckAuth, Permission('ADMIN'), graphqlHTTP({
  schema: adminSchema,
  graphiql: { subscriptionEndpoint: subscriptionsEndpoint } as any,
  context: { pubsub }
})
)

graphqlRoute.post("/graphql", CheckAuth, Permission('USER'), graphqlHTTP({
  schema: clientSchema,
  graphiql: { subscriptionEndpoint: subscriptionsEndpoint } as any,
  context: { pubsub }
})
)