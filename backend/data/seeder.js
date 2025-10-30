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

    // Insert courses with modules and lessons
    const courses = [
      {
        title: "Web Development Bootcamp",
        description: "Learn web development from scratch - HTML, CSS, JavaScript, React, and Node.js",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
        price: 100,
        category: webDevCategory._id,
        instructor: instructorUser._id,
        modules: [
          {
            title: "HTML & CSS Fundamentals",
            lessons: [
              {
                title: "Introduction to HTML",
                videoUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE"
              },
              {
                title: "HTML Elements and Structure",
                videoUrl: "https://www.youtube.com/watch?v=salY_Sm6mv4"
              },
              {
                title: "CSS Styling Basics",
                videoUrl: "https://www.youtube.com/watch?v=yfoY53QXEnI"
              },
              {
                title: "CSS Flexbox Layout",
                videoUrl: "https://www.youtube.com/watch?v=JJSoEo8JSnc"
              }
            ]
          },
          {
            title: "JavaScript Programming",
            lessons: [
              {
                title: "JavaScript Variables and Data Types",
                videoUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c"
              },
              {
                title: "Functions and Scope",
                videoUrl: "https://www.youtube.com/watch?v=xUI5Tsl2JpY"
              },
              {
                title: "DOM Manipulation",
                videoUrl: "https://www.youtube.com/watch?v=0ik6X4DJKCc"
              },
              {
                title: "Async JavaScript & Promises",
                videoUrl: "https://www.youtube.com/watch?v=PoRJizFvM7s"
              }
            ]
          },
          {
            title: "React Framework",
            lessons: [
              {
                title: "React Components Basics",
                videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0"
              },
              {
                title: "State and Props",
                videoUrl: "https://www.youtube.com/watch?v=4pO-HcG2igk"
              },
              {
                title: "React Hooks",
                videoUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0"
              },
              {
                title: "Building a React App",
                videoUrl: "https://www.youtube.com/watch?v=w7ejDZ8SWv8"
              }
            ]
          },
          {
            title: "Backend Development",
            lessons: [
              {
                title: "Node.js Introduction",
                videoUrl: "https://www.youtube.com/watch?v=TlB_eWDSMt4"
              },
              {
                title: "Express.js Framework",
                videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE"
              },
              {
                title: "MongoDB Database",
                videoUrl: "https://www.youtube.com/watch?v=ExcRbA7fy_A"
              },
              {
                title: "API Development",
                videoUrl: "https://www.youtube.com/watch?v=pKd0Rpw7O48"
              }
            ]
          }
        ]
      },
      {
        title: "Data Structures & Algorithms",
        description: "Master DSA concepts for technical interviews and problem solving",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
        price: 80,
        category: createdCategories.find(cat => cat.name === "DSA")._id,
        instructor: instructorUser._id,
        modules: [
          {
            title: "Array and String Algorithms",
            lessons: [
              {
                title: "Array Basics and Operations",
                videoUrl: "https://www.youtube.com/watch?v=QJNwK2uJyGs"
              },
              {
                title: "Two Pointer Technique",
                videoUrl: "https://www.youtube.com/watch?v=On03HWe2tZM"
              },
              {
                title: "String Manipulation",
                videoUrl: "https://www.youtube.com/watch?v=Wdjr6uoZ0e0"
              }
            ]
          },
          {
            title: "Linked Lists",
            lessons: [
              {
                title: "Linked List Implementation",
                videoUrl: "https://www.youtube.com/watch?v=njTh_OwMljA"
              },
              {
                title: "Reversing Linked Lists",
                videoUrl: "https://www.youtube.com/watch?v=XDO6I8jxHtA"
              }
            ]
          },
          {
            title: "Trees and Graphs",
            lessons: [
              {
                title: "Binary Trees Traversal",
                videoUrl: "https://www.youtube.com/watch?v=9RHO6jU--GU"
              },
              {
                title: "Graph Algorithms - BFS/DFS",
                videoUrl: "https://www.youtube.com/watch?v=zaBhtODEL0w"
              }
            ]
          }
        ]
      }
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
