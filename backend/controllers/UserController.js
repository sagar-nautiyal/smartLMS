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

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return res
        .status(200)
        .json({ message: "Login successful", token, name: user.name });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserProfile(req, res) {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }

      return res
        .status(200)
        .json({ id: user._id, name: user.name, email: user.email });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server error" });
    }
  }

  //update
  async updateUserProfile(req, res) {
    try {
      const { name, email } = req.body;
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      user.name = name ? name : user.name;
      user.email = email ? email : user.email;

      const updatedUser = await user.save();

      return res
        .status(200)
        .json({
          id: user._id,
          name: updatedUser.name,
          email: updatedUser.email,
        });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server error" });
    }
  }
}
