import express from "express";
import CourseController from "../controllers/CourseController.js";
import auth from "../middlewares/auth.js";
const courseRouter = express.Router();

const courseController = new CourseController();

//get myCourses after enroll

courseRouter.get("/my-courses", auth, (req, res) => {
  courseController.myCourses(req, res);
});

//get all courses
courseRouter.get("/", (req, res) => {
  courseController.getCourses(req, res);
});

//get details for a single course
courseRouter.get("/:courseId", (req, res) => {
  courseController.getCourseById(req, res);
});
//enroll user
courseRouter.post("/:courseId/enroll", auth, (req, res) => {
  courseController.enrollStudentInCourse(req, res);
});

export default courseRouter;
