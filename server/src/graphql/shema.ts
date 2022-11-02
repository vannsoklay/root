import { GraphQLSchema } from "graphql";
import { adminQuery } from "../controller/admin/query";
import { clientQuery } from "../controller/client/query";
import { adminMutation } from "../controller/admin/mutation";
import { clientMutation } from "../controller/client/mutation";
import { Subscription } from "../controller/subscribe";

export const adminSchema = new GraphQLSchema({
  query: adminQuery,
  mutation: adminMutation,
  subscription: Subscription
})

export const clientSchema = new GraphQLSchema({
  query: clientQuery,
  mutation: clientMutation,
  subscription: Subscription
})