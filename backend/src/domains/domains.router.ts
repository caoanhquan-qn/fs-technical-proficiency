import express from "express";
import { validateDomain, addNewDomain } from "./domains.controller";
import { authenticateJWT } from "../auth/auth.middleware";

const domainsRouter = express.Router();
domainsRouter.post("/validate", validateDomain);
domainsRouter.post("/add", authenticateJWT, addNewDomain);

export default domainsRouter;
