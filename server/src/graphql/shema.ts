import { GraphQLSchema } from "graphql";
import { adminQuery } from "../controller/admin/query";
import { clientQuery } from "../controller/client/query";
import { adminSubscription } from "../controller/admin/subscribe";
import { clientSubscription } from "../controller/client/subscribe";

export const schema = (prop: any) => {
  return  new GraphQLSchema({
    query: prop == 'admin' ? adminQuery : clientQuery,
    subscription: prop == 'admin' ? adminSubscription : clientSubscription,
  });
};

export const adminSchema = new GraphQLSchema({
  query: adminQuery,
  subscription: adminSubscription
})

export const clientSchema = new GraphQLSchema({
  query: clientQuery,
  subscription: clientSubscription
})