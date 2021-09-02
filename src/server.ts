import express from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () =>
  // eslint-disable-next-line no-console
  console.log("🚀 Server started on http://localhost:3333")
);
