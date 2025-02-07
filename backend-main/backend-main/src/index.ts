import express, { Express, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

// Database
import { connectDB } from "./config/database";

// Routes
import routes from "./routes";

const app: Express = express();
const httpServer = createServer(app);

// database
connectDB();

// Initialize socket.io and traffic stats service
import { initializeSocket } from "./services/socket.service";
import { startTrafficStatsUpdates } from "./services/traffic.service";

initializeSocket(httpServer);
startTrafficStatsUpdates();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Juggle Backend");
});
app.use("/api/v1", routes);

// server
const port = process.env.PORT || 8000;
httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
