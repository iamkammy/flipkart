import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Our server is up and running in port");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
