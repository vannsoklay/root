import express from "express";
import { login, register } from "../controller/auth";
import { graphqlRoute } from "./graphql";

export const router = express.Router();

// route work with authentication
router.get('/login', login);
router.get('/register', register);

// route work with graphql
router.use(graphqlRoute)
