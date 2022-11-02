import { GraphQLObjectType, GraphQLString } from 'graphql';

export const adminMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        message: {
            type: GraphQLString,
            resolve: (parent, args, { pubsub }) => {
                let message = "hello world"
                console.log(pubsub);
                
                pubsub.publish('message', {
                    message: message,
                })
                return message;
            },
        },
    },
});