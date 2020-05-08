require("dotenv").config();

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";

import grains from "./routes/grains";
import users from "./routes/users";
import auth from "./routes/auth";

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use("/grains", grains);
app.use("/users", users);
app.use("/auth", auth);

app.listen(process.env.PORT);

console.log("[app]: http://localhost:" + process.env.PORT);
