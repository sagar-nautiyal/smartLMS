import Category from "../models/Category.js";

export default class CategoryController {
  async getCategories(req, res) {
    try {
      // Logic to fetch categories from the database
      const categories = await Category.find();
      return res.status(200).json(categories);
    } catch (err) {
      console.log("Error while fetching categories", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
