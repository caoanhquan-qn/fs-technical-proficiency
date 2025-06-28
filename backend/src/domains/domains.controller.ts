import { Request, Response, NextFunction } from "express";
import { spawn } from "child_process";
import constructQuery from "../helpers/construct-query";

export const validateDomain = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { domain, dkimSelector = "default" } = req.body;

  if (!domain) {
    res.status(400).json({ error: "Domain is required" });
  }

  const pythonProcess = spawn("py", [
    `${__dirname}/validate_email.dns.py`,
    domain,
    dkimSelector,
  ]);

  let result = "";
  let error = "";
  let responseSent = false;

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    error += data.toString();
  });

  pythonProcess.on("close", (code) => {
    if (responseSent) return;
    responseSent = true;

    if (code !== 0) {
      res.status(500).json({
        error: "Python script failed",
        details: error,
      });
      return;
    }

    try {
      const parsed = JSON.parse(result);
      res.json(parsed);
      return;
    } catch (err) {
      res.status(500).json({
        error: "Invalid JSON output from script",
        details: err instanceof Error ? err.message : String(err),
      });
    }
  });

  pythonProcess.on("error", (err) => {
    if (responseSent) return;
    responseSent = true;

    res.status(500).json({
      error: "Failed to start Python process",
      details: err.message,
    });
  });
};

export const addNewDomain = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { name, createdBy } = req.body;

  if (!name || !createdBy) {
    res.status(400).json({ error: "Name and createdBy are required" });
    return;
  }

  const query =
    "INSERT INTO domains (name, created_by) VALUES ($1, $2) RETURNING *";

  try {
    await constructQuery(query, [name, createdBy]);
    res.status(201).json({
      status: "success",
      name,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
};
