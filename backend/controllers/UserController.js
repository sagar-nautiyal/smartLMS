import dotenv from "dotenv";
dotenv.config();
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(200).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.log("Error while registering user", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Invalid email" });
      }

      const check = await bcrypt.compare(password, user.password);
      if (!check) {
        return res.status(404).json({ message: "enter correct password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.log("Error while logging in user", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
