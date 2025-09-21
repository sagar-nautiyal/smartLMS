import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { courseSelector } from "../../reducer/CourseReducer";
import { getCourse } from "../../reducer/CourseReducer";
export default function FeaturedCourses() {
  const dispatch = useDispatch();
  const { courses } = useSelector(courseSelector);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        await dispatch(getCourse()).unwrap();
      } catch (error) {
        console.log(
          "Error while fetching course in frontEnd from backend ",
          error
        );
      }
    };
    fetchCourse();
  }, []);
  return (
    <section className="py-5">
      <div className="container">
        {/* Heading Row */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="fw-bold mb-0">Featured Courses</h2>
          <Link
            to="/courses"
            className="fw-semibold text-primary text-decoration-none"
          >
            View All Courses <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <p className="text-muted mb-4">
          Explore our top‑rated courses handpicked for you.
        </p>

        {/* Courses Grid */}
        <div className="row g-4">
          {courses.map((course) => (
            <div className="col-12 col-sm-6 col-lg-3" key={course._id}>
              <Link
                to={`/courses/${course._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100 shadow-lg border-0">
                  <div className="position-relative">
                    <img
                      src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&auto=format&fit=crop&q=60"
                      className="card-img-top"
                      alt="Web Development"
                    />
                    <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                      {course.category.name}
                    </span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text text-muted small">
                      {course.description}.
                    </p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center small text-muted mb-1">
                        <span>
                          ⭐⭐⭐⭐⭐ <strong>4.8</strong>
                        </span>
                        <span className="fw-bold text-primary">
                          {course.price}
                        </span>
                      </div>
                      <div className="text-end small text-muted">
                        {course.instructor.name}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
