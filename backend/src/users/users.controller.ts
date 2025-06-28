import { Request, Response, NextFunction } from "express";
import constructQuery from "../helpers/construct-query";

export const authenticateUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE username = $1 AND password = $2";
  const params = [username, password];

  try {
    const result = (await constructQuery(sql, params)) as { rows: any[] };
    if (result.rows.length > 0) {
      res
        .status(200)
        .json({ message: "Login successful", user: result.rows[0] });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
};
