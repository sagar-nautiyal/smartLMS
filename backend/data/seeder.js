import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

import connectDB from "../config/connectDB.js";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
import User from "../models/UserModel.js";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectDB();

const importData = async () => {
  try {
    // Clear the database
    await Course.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    // Read and parse JSON files
    const userData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8")
    );
    const categoryData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "/category.json"), "utf-8")
    );

    // Hash passwords synchronously
    const usersWithHashedPassword = userData.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      return { ...user, password: hashedPassword };
    });

    // Insert users
    const createdUsers = await User.insertMany(usersWithHashedPassword);
    const instructorUser = createdUsers.find(
      (user) => user.role === "instructor"
    );

    // Insert categories
    const createdCategories = await Category.insertMany(categoryData);
    const webDevCategory = createdCategories.find(
      (category) => category.name === "Web Development"
    );

    // Insert courses
    const courses = [
      {
        title: "Web Development Bootcamp",
        description: "Learn web development from scratch",
        price: 100,
        category: webDevCategory._id,
        instructor: instructorUser._id,
      },
    ];
    await Course.insertMany(courses);

    console.log("✅ Data Imported Successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error while importing data", err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Course.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    console.log("🗑️ Data Destroyed Successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error while destroying data", err);
    process.exit(1);
  }
};

// Run script
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
