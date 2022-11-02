import { GraphQLObjectType, GraphQLString } from "graphql";
import { pubsub } from "../utils/pubsub";

export const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    message: {
      type: GraphQLString,
      resolve: (payload, args, context, info) => {
        return payload.message;
      },
      subscribe: () => {
        return pubsub.asyncIterator("message");
      },
    },
  },
});

export const clientMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        message: {
            type: GraphQLString,
            resolve: (parent, args, { pubsub: p }) => {
                let message = "hello world"
                pubsub.publish('message', {
                    message: message,
                })
                return message;
            },
        },
    },
});
