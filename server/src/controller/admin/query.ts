import { GraphQLObjectType, GraphQLString } from 'graphql';

export const adminQuery = new GraphQLObjectType({
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