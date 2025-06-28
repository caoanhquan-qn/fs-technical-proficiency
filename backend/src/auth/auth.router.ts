import express from "express";
import { authenticateUser, registerUser } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", authenticateUser);
authRouter.post("/signup", registerUser);

export default authRouter;
