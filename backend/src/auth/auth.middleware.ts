import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import constructQuery from "../helpers/construct-query";
import { GET_USER_BY_ID_QUERY } from "./auth.query";
import { IDecodedToken } from "../interface/auth.interface";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
      };
    }
  }
}

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET ?? "SECRET";
    const decoded = jwt.verify(token, JWT_SECRET);

    // check if user exists in the database
    const existingUserResult = (await constructQuery(GET_USER_BY_ID_QUERY, [
      (decoded as IDecodedToken).id,
    ])) as { rows: any[] };

    if (existingUserResult.rows.length === 0) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const foundUser = existingUserResult.rows[0];
    req.user = {
      id: foundUser.id,
      username: foundUser.username,
    };

    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(403).json({ error: "Invalid token" });
    return;
  }
};
