import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    enum: ["student", "instructor", "admin"],
    default: "student",
  },
  timestamp: true,
});

const User = mongoose.model("User", userSchema);

export default User;
