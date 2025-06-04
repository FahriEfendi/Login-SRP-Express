import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/Database.js";
import cookieParser from "cookie-parser";
import authRoutes from "./controllers/auth.js";

dotenv.config();
const app = express();
app.use(express.static("public"));
app.use("/public", express.static("public"));

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:3000"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

/* try {
  await db.authenticate();
  console.log("Database terhubung..");
} catch (error) {
  console.error(error);
} */

app.use(cookieParser());
app.use(express.json());

app.use("/api", authRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
