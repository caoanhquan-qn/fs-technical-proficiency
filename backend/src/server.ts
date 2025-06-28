import { config } from "dotenv";
config({ path: "./.env" });
import app from "./app";
import http from "http";

const PORT: string = process.env.PORT ?? "4000";
const server = new http.Server(app);

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception: ", error);
  process.exit(1);
});

process.on(
  "unhandledRejection",
  (reason: unknown, promise: Promise<unknown>) => {
    console.error("Unhandled Rejection at: ", promise, "reason: ", reason);
    process.exit(1);
  }
);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
