import express, { Request, Response, NextFunction } from "express";

import { db } from "../postgres";
import { auth } from "../middleware/auth";
const router = express.Router();

const GET = (
  url: string,
  handler: (req: Request) => any,
  ...middlewares
): any => {
  router.get(url, middlewares, async (req: Request, res: Response) => {
    try {
      const data = await handler(req);

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

GET("/", () => db.grains.select());

GET(
  "/create",
  (req) => {
    const { name, region, sort, owner, tonn, price } = req.body;

    return db.grains.add({
      name,
      region,
      sort,
      owner,
      tonn: Number.parseInt(tonn),
      price: Number.parseInt(price),
    });
  },
  auth
);

GET("/remove/:id", (req) => db.grains.remove(+req.params.id), auth);

GET(
  "/update/:id",
  (req) => {
    const { name, region, sort, owner, tonn, price } = req.body;

    return db.grains.update({
      id: +req.params.id,
      name,
      region,
      sort,
      owner,
      tonn: Number.parseInt(tonn),
      price: Number.parseInt(price),
    });
  },
  auth
);

GET("/:id", (req) => db.grains.find(+req.params.id));

export default router;
