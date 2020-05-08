import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validate } from "../models/user";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth";

import { db } from "../postgres";

const router = express.Router();

const GET = (url: string, handler: (req: Request) => any, ...middlewares) => {
  router.get(url, middlewares, async (req, res: Response) => {
    try {
      const data = await handler(req);

      if (url === "/create") {
        const token = jwt.sign(
          { id: data.id as number },
          process.env.jwtPrivateKey as string
        );

        res.header("x-auth-token", token).json({ success: true, data });
      }

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      res.json({
        success: false,
        error: error.message || error,
      });
    }
  });
};

GET(
  "/me",
  async (req: any) => {
    return db.users.me(+req.user.id);
  },
  auth
);

GET("/create", async (req) => {
  const { error } = validate(req.body);
  const { email, firstName, lastName, role, password } = req.body;

  if (error) return error.details[0].message;

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  return db.users.add({
    email,
    firstName,
    lastName,
    role,
    password: hashedPass,
  });
});

export default router;
