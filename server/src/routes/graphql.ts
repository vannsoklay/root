import express from 'express';
import CheckAuth from '../middleware/check-auth';

export const graphqlRoute = express.Router();

graphqlRoute.get("/graphql", (req: any, res: any) => {
    res.send("Hello GraphQL !!!")
})