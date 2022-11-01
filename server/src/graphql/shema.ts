import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const subscription = new GraphQLObjectType({
  name: 'Subscription',
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
        return pubsub.asyncIterator('greeting');
      },
    },
  },
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    dummy: {
      type: GraphQLString,
      resolve: () => {
        return 'dummy';
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query,
  subscription,
});

setInterval(() => {
  pubsub.publish('greeting', {
    greeting: 'Bonjour',
  });
}, 1000);

// createServer(
//   {
//     schema,
//     execute,
//     subscribe,
//   },
//   {
//     server,
//     path: '/graphql',
//   }
// );