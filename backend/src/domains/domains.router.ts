import express from "express";
import { validateDomain, addNewDomain } from "./domains.controller";

const domainsRouter = express.Router();
domainsRouter.post("/validate", validateDomain);
domainsRouter.post("/add", addNewDomain);

export default domainsRouter;
