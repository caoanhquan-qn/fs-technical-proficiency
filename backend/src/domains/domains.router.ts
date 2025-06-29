import express from "express";
import {
  validateDomain,
  addNewDomain,
  getAllDomains,
} from "./domains.controller";
import { authenticateJWT } from "../auth/auth.middleware";

const domainsRouter = express.Router();
domainsRouter.post("/validate", validateDomain);
domainsRouter.post("/add", authenticateJWT, addNewDomain);
domainsRouter.get("/getAll", authenticateJWT, getAllDomains);

export default domainsRouter;
