import { GraphQLObjectType, GraphQLString } from "graphql";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

export const clientSubscription: any = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    greeting: {
      type: GraphQLString,
      resolve: (source) => {
        if (source instanceof Error) {
          throw source;
        }
        return source.greeting;
      },
      subscribe: () => {
        return pubsub.asyncIterator("greeting");
      },
    },
  },
});

setInterval(() => {
  pubsub.publish("greeting", {
    greeting: "client",
  });
}, 1000);
