import { Request, Response, NextFunction } from "express";
import constructQuery from "../helpers/construct-query";
import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import bcrypt from "bcryptjs";

const signToken = (id: number) => {
  const JWT_SECRET = process.env.JWT_SECRET ?? "SECRET";
  const expiresIn: StringValue = process.env.JWT_EXPIRES_IN as StringValue;
  return jwt.sign({ id: id }, JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

const sendJWT = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
  };
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    // data: {
    //   user,
    // },
  });
};

// Hash the password
const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 12);

// Compare the password with the hashed password
const validatePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const registerUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const existingUserSql = "SELECT * FROM users WHERE username = $1";
  const existingUserResult = (await constructQuery(existingUserSql, [
    username,
  ])) as { rows: any[] };

  if (existingUserResult.rows.length > 0) {
    res.status(400).json({ error: "Username already exists" });
    return;
  }
  const hashedPassword = await hashPassword(password);

  const sql =
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
  const params = [username, hashedPassword];

  try {
    const result = (await constructQuery(sql, params)) as { rows: any[] };
    const user = result.rows[0];

    if (!user) {
      res.status(400).json({ error: "User registration failed" });
      return;
    }

    sendJWT(user, 201, res);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    // Check if the user exists and validate the password
    const sql = "SELECT * FROM users WHERE username = $1";
    const params = [username];
    const result = (await constructQuery(sql, params)) as { rows: any[] };
    // If no user found, return an error
    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    if (
      result.rows.length > 0 &&
      (await validatePassword(password, result.rows[0].password))
    ) {
      const foundUser = result.rows[0];
      sendJWT(foundUser, 200, res);
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
};
