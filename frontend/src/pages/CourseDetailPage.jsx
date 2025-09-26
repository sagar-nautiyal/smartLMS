import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { courseSelector } from "../reducer/CourseReducer";
import { fetchCurrentCourse } from "../reducer/CourseReducer";
import { toast } from "react-toastify";
export default function CourseDetailPage() {
  //to fetch the current selected course
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, isLoading } = useSelector(courseSelector);

  //fetch the course
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCurrentCourse({ courseId }));
    }
  }, [dispatch, courseId]);

  //get currentCourse when state changes

  useEffect(() => {
    if (currentCourse) {
      toast.success(`Loaded course: ${currentCourse.title}`);
    }
  }, [currentCourse]);

  if (isLoading) {
    return (
      <div>
        <h1>
          <Skeleton width={300} />
        </h1>
        <p>
          <Skeleton count={3} />
        </p>
        <p>
          <Skeleton width={200} />
        </p>
        <p>
          <Skeleton width={150} />
        </p>
        <div>
          <Skeleton width={100} height={40} style={{ marginRight: 10 }} />
          <Skeleton width={100} height={40} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container my-5">
        <div className="row g-4">
          {/* Main Content */}
          <div className="col-12 col-lg-8">
            {/* Course Header */}
            <h2 className="fw-bold mb-2">
              Full‑Stack Web Development Bootcamp
            </h2>
            <p className="text-muted mb-3">
              Learn how to build modern web applications with React, Node.js,
              Express, and MongoDB.
            </p>
            <div className="d-flex align-items-center mb-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Instructor"
                className="rounded-circle me-2"
              />
              <div>
                <h6 className="mb-0">John Doe</h6>
                <small className="text-muted">Senior Software Engineer</small>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs" id="courseTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="overview-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#overview"
                  type="button"
                  role="tab"
                >
                  Overview
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="curriculum-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#curriculum"
                  type="button"
                  role="tab"
                >
                  Curriculum
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="reviews-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#reviews"
                  type="button"
                  role="tab"
                >
                  Reviews
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="instructor-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#instructor"
                  type="button"
                  role="tab"
                >
                  Instructor
                </button>
              </li>
            </ul>

            {/* Tab Content */}
            <div
              className="tab-content p-3 border border-top-0 rounded-bottom"
              id="courseTabsContent"
            >
              {/* Overview */}
              <div
                className="tab-pane fade show active"
                id="overview"
                role="tabpanel"
              >
                <h5 className="fw-bold mb-3">What you'll learn</h5>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li>✔ Build responsive websites with React</li>
                      <li>✔ Create REST APIs with Node.js</li>
                      <li>✔ Work with MongoDB</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li>✔ Deploy apps to the cloud</li>
                      <li>✔ Master Git & GitHub workflows</li>
                      <li>✔ Debug and optimize performance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Curriculum */}
              <div className="tab-pane fade" id="curriculum" role="tabpanel">
                <div className="accordion" id="curriculumAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                      >
                        Module 1: Introduction to Web Development
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#curriculumAccordion"
                    >
                      <div className="accordion-body">
                        <ul>
                          <li>Lesson 1: HTML Basics</li>
                          <li>Lesson 2: CSS Fundamentals</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Add more modules here */}
                </div>
              </div>

              {/* Reviews */}
              <div className="tab-pane fade" id="reviews" role="tabpanel">
                <h5 className="fw-bold mb-3">Student Reviews</h5>
                <div className="mb-3">
                  <span className="text-warning">⭐⭐⭐⭐⭐</span>
                  <p className="mb-0">
                    “Great course, very practical and easy to follow.”
                  </p>
                  <small className="text-muted">– Jane Smith</small>
                </div>
              </div>

              {/* Instructor */}
              <div className="tab-pane fade" id="instructor" role="tabpanel">
                <h5 className="fw-bold mb-3">About the Instructor</h5>
                <p>
                  John Doe is a senior engineer with 10+ years of experience
                  building scalable web apps. He has taught over 50,000 students
                  worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: "80px" }}>
              <img
                src="https://via.placeholder.com/600x400"
                className="card-img-top"
                alt="Course Thumbnail"
              />
              <div className="card-body">
                <h4 className="fw-bold text-primary mb-3">$49.99</h4>
                <button className="btn btn-primary w-100 mb-2">Buy Now</button>
                <button className="btn btn-outline-secondary w-100 mb-3">
                  Add to Cart
                </button>
                <p className="small text-muted mb-1">
                  30-Day Money-Back Guarantee
                </p>
                <p className="small text-muted">Full lifetime access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
