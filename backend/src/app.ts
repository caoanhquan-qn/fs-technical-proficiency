import express, { Application, Request, Response, NextFunction } from "express";

// Middleware
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import loggerExpress from "logger";
import usersRouter from "./users/users.router";
import domainsRouter from "./domains/domains.router";

// Router

const logger = loggerExpress.createLogger();
const app: Application = express();

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
  })
);

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/domains", domainsRouter);

// global error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
