import { GraphQLObjectType, GraphQLString } from 'graphql';
import { pubsub } from "../../utils/pubsub";

export const clientMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        message: {
            type: GraphQLString,
            resolve: (parent, args, context) => {
                let message = "hello world 1233"
                pubsub.publish('message', {
                    message: message,
                })
                return message;
            },
        },
    },
});