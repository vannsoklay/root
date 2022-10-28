import express from 'express';

export const graphqlRoute = express.Router();

graphqlRoute.get("/graphql", (req: any, res: any) => {
    res.send("Hello GraphQL !!!")
})