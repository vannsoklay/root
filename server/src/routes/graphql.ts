import express from 'express';
import dotenv from "dotenv";
import CheckAuth from '../middleware/check-auth';
import { Permission } from '../middleware/permission';
import { graphqlHTTP } from 'express-graphql';
import { schema } from '../graphql/shema';

dotenv.config();

export const graphqlRoute = express.Router();

const subscriptionsEndpoint = `ws://localhost:${process.env.PORT}/subscriptions`;
graphqlRoute.post("/graphql", CheckAuth, Permission('ADMIN') , graphqlHTTP({
    schema: schema,
    graphiql: { subscriptionEndpoint: subscriptionsEndpoint } as any,
  })
)

graphqlRoute.get("/graphql", CheckAuth, Permission('SUPERADMIN') , (req: any, res: any) => {
    res.send("Hello super admin graphQL !!!")
})