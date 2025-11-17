import "dotenv/config.js";
import express from "express";

import { PostgresHelper } from ".src/db/postgres/helper.js";
import { CreateUserController } from "./src/controllers/create-user.js";

const app = express();
app.use(express.json());

app.get("/api/users", async (req, res) => {
  const users = await PostgresHelper.query("SELECT * FROM users");
  res.send(JSON.stringify(users));
});

app.get("/api/users/:id", async (req, res) => {
  const user = await PostgresHelper.query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);
  res.send(JSON.stringify(user));
});

app.post("/api/users", async (req, res) => {
  const createUserController = new CreateUserController();
  const { statusCode, body } = await createUserController.execute(req);
  res.status(statusCode).json(body);
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
