import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const auth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ message: "Unauthorized,Invalid Token" });
  }

  try {
    const token = req.headers["authorization"].split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select("-password");
    //res.status(200).send("Logged In Successfull");
    next();
  } catch (err) {
    return res.status(404).send("Invalid Token");
  }
};

export default auth;
