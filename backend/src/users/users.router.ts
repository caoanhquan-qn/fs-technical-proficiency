import express from "express";
import { authenticateUser } from "./users.controller";

const usersRouter = express.Router();
usersRouter.post("/login", authenticateUser);

export default usersRouter;
