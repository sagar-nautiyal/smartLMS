import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userroute.js";
import courseRouter from "./routes/courseRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import paymentRouter from "./routes/paymentRoutes.js";
import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//routes
app.use("/api/users", userRouter);
//course
app.use("/api/courses", courseRouter);
//category
app.use("/api/categories", categoryRouter);
//payment
app.use("/api/payment", auth, paymentRouter);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
