import express from 'express';
import CheckAuth from '../middleware/check-auth';
import { Permission } from '../middleware/permission';

export const graphqlRoute = express.Router();

graphqlRoute.get("/graphql", CheckAuth, Permission('ADMIN') , (req: any, res: any) => {
    res.send("Hello admin graphQL !!!")
})

graphqlRoute.get("/graphql", CheckAuth, Permission('SUPERADMIN') , (req: any, res: any) => {
    res.send("Hello super admin graphQL !!!")
})