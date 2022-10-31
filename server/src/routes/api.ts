import express from "express";
import { login, register } from "../controller/auth";
import CheckAuth from '../middleware/check-auth'
import { graphqlRoute } from "./graphql";
import { validate } from "../middleware/validate";
import { createUserSchema } from "../models/user";

export const router = express.Router();

// route work with authentication
router.post('/login', validate(createUserSchema), login);
router.post('/register', register);

// route work with graphql
router.use(graphqlRoute)
