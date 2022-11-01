import express from "express";
import { login, register } from "../controller/auth";
import requireUser from '../middleware/require-user'
import { graphqlRoute } from "./graphql";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../models/user";

export const router = express.Router();

// route work with authentication
router.post('/login',validate(loginUserSchema), login);
router.post('/register', validate(createUserSchema), register);

// route work with graphql
router.use(graphqlRoute, requireUser)
