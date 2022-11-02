import { GraphQLObjectType, GraphQLString } from 'graphql';

export const adminQuery: any = new GraphQLObjectType({
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