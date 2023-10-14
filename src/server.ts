import express from "express";
import { UserController } from "./controllers/userController";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users", UserController.find);

app.listen(3000, () => {
  console.log(`api rodando!`);
});
