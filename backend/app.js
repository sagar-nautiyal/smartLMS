import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import paymentRouter from "./routes/paymentRoutes.js";
import auth from "./middlewares/auth.js";
import cartRouter from "./routes/cartRoutes.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://13.61.151.128',
    'http://13.61.151.128:3000',
    'http://13.61.151.128:80',
    process.env.FRONTEND_URL
  ],
  credentials: true
}));
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
//cart
app.use("/api/cart", auth, cartRouter);

const port = process.env.PORT || 3002;
app.listen(port, "0.0.0.0", () => {
  // ...
  connectDB();
});
