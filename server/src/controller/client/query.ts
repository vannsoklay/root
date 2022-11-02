import { GraphQLObjectType, GraphQLString } from 'graphql';

export const clientQuery: any = new GraphQLObjectType({
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