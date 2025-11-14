import "dotenv/config.js";
import express from "express";

import { PostgresHelper } from ".src/db/postgres/helper.js";

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
  const { name, email } = req.body;
  const result = await PostgresHelper.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  res.status(201).send(JSON.stringify(result));
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
