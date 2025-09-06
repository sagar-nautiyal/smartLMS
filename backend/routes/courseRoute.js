import express from "express";
import CourseController from "../controllers/CourseController.js";
const courseRouter = express.Router();

const courseController = new CourseController();

//get all courses
courseRouter.get("/", (req, res) => {
  courseController.getCourses(req, res);
});

//get details for a single course
courseRouter.get("/:courseId", (req, res) => {
  courseController.getCourseById(req, res);
});

export default courseRouter;
