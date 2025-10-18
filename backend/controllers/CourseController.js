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
      // Logic to fetch course by ID from the database
      const course = await Course.findById(courseId)
        .populate("instructor", "name")
        .populate("category", "name");
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json(course);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  //enroll user
  async enrollStudentInCourse(req, res) {
    try {
      //enroll user into course
      //courseId
      const { courseId } = req.params;
      // Logic to fetch course by ID from the database
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      //validate if uer already purchased
      if (course.enrolledStudents.includes(req.user.id)) {
        return res
          .status(400)
          .json({ message: "You are already enrolled for this course" });
      }

      //update userId in enrolledStudents
      course.enrolledStudents.push(req.user.id);
      await course.save();
      return res
        .status(200)
        .json({ message: "User is SuccessFully enrolled for this course" });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //fetch the enrolled User
  async myCourses(req, res) {
    try {
      //get my courses
      const courses = await Course.find({ enrolledStudents: req.user.id });
      // console.log(
      //   "fetched the courses of user of id",
      //   req.user._id,
      //   "and user's courses are ",
      //   courses
      // );
      return res.status(200).json(courses);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
