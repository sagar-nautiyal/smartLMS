import Category from "../models/Category.js";
import Course from "../models/Course.js";

export default class CategoryController {
  async getCategories(req, res) {
    try {
      // Logic to fetch categories from the database
      const categories = await Category.find();
      //console.log("categories: ", categories);
      return res.status(200).json(categories);
    } catch (err) {
      console.log("Error while fetching categories", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async filterCategories(req, res) {
    try {
      const { search, categories, level, maxPrice } = req.query;
      let filter = {};
      if (search) filter.title = { $regex: search, $options: "i" };
      if (categories) filter.category = { $in: categories.split(",") };
      if (level) filter.level = level;
      if (maxPrice) filter.price = { $lte: Number(maxPrice) };

      const courses = await Course.find(filter);
      return res.status(200).json({ data: courses });
    } catch (err) {
      console.log("error fetching the courses: ", err);
      return res.status(500).json("Internal Server Error");
    }
  }
}
