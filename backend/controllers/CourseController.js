import Course from "../models/Course.js";

export default class CourseController {
  async getCourses(req, res) {
    try {
      // Logic to fetch courses from the database
      const courses = await Course.find()
        .populate("instructor", "name")
        .populate("category", "name");
      return res.status(200).json({ data: courses });
    } catch (err) {
      console.log("Error while fetching courses", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCourseById(req, res) {
    try {
      const { courseId } = req.params;
      console.log("CourseID: ", courseId);
      // Logic to fetch course by ID from the database
      const course = await Course.findById(courseId)
        .populate("instructor", "name")
        .populate("category", "name");
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json(course);
    } catch (err) {
      console.log("Error while fetching course", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
