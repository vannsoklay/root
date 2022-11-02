import { GraphQLObjectType, GraphQLString } from 'graphql';

export const clientQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        client: {
            type: GraphQLString,
            resolve: () => {
                return 'client';
            },
        },
    },
});