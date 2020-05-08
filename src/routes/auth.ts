import config from "config";

import express, { Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../postgres";
import { User } from "./../models/user";

const router = express.Router();

const GET = (
  url: string,
  handler: (req: Request) => any,
  ...middlewares
): any => {
  router.get(url, middlewares, async (req, res: Response) => {
    try {
      const { error, data } = await handler(req);

      if (error) throw new Error(error);

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      res.json({
        success: false,
        error:
          "Не удаётся войти, проверьте правильность написания логина и пароля",
      });
    }
  });
};

const validate = (body: Request["body"]) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(body, schema);
};

GET("/", async (req) => {
  const { error } = validate(req.body);
  const { email, password } = req.body;
  if (error) return { error: error.details[0].message, data: null };

  const user: User = await db.users.find({ email });
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return { error: "Неправильный пароль!", data: null };

  const token = jwt.sign(
    { id: user.id as number },
    process.env.jwtPrivateKey as string
  );

  return { error: false, data: token };
});

export default router;
