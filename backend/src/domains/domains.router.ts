import express from "express";
import { validateDomain } from "./domains.controller";

const domainsRouter = express.Router();
domainsRouter.post("/validate", validateDomain);

export default domainsRouter;
