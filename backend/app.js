import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userroute.js";

const app = express();
app.use(express.json());

app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//routes
app.use("/api/users", userRouter);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
