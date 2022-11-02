import { GraphQLObjectType, GraphQLString } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

export const adminMutation: any = new GraphQLObjectType({
    name: 'Mutation',
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