import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req, res: Response, next: NextFunction): any => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey as string);
    req.user = decoded as object;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
