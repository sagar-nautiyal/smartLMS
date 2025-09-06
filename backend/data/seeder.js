import fs from "fs";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
import User from "../models/UserModel.js";

const importData = async () => {
  try {
    //clear the database
    await Course.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();

    //insert the user data

    const userData = fs.readFileSync(
      path.join(__dirname, "/data/users.json"),
      "utf-8"
    );
    const categoryData = fs.readFileSync(
      path.join(__dirname, "/data/categories.json"),
      "utf-8"
    );

    const userswithHashedPassword = userData.map(async (user) => {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(user.password, salt);
      return { ...user, password: hashedPassword };
    });

    const createdUsers = await User.insertMany(userswithHashedPassword);

    const instructorUser = createdUsers.find(
      (user) => user.role === "instructor"
    );

    //insert category data
    const createdCategories = await Category.insertMany(
      JSON.parse(categoryData)
    );

    const webDevCategory = createdCategories.find(
      (category) => category.name === "Web Development"
    );

    //insert course data
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
    console.log("Data Imported Successfully");
    process.exit();
  } catch (err) {
    console.log("Error while importing data", err);
  }

  //remove the data

  const destroyData = async () => {
    try {
      await Course.deleteMany();
      await User.deleteMany();
      await Category.deleteMany();
      console.log("Data Destroyed Successfully");
      process.exit();
    } catch (err) {
      console.log("Error while destroying data", err);
    }
  };
};
