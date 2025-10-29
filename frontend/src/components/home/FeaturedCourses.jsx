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
        // Silently handle error - courses will remain empty array
      }
    };
    fetchCourse();
  }, []);
  return (
    <section className="py-5" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        {/* Heading Row */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2
              className="fw-bold mb-2 text-gradient"
              style={{ fontSize: "2.5rem" }}
            >
              🌟 Featured Courses
            </h2>
            <p className="text-muted fs-5 mb-0">
              Explore our top‑rated courses handpicked just for you
            </p>
          </div>
          <Link
            to="/courses"
            className="btn btn-outline-primary fw-semibold text-decoration-none d-none d-md-block"
            style={{ borderRadius: "25px" }}
          >
            View All Courses <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="row g-4 mt-2">
          {courses.map((course) => (
            <div className="col-12 col-sm-6 col-lg-3" key={course._id}>
              <Link
                to={`/courses/${course._id}`}
                className="text-decoration-none text-dark"
              >
                <div
                  className="card h-100 border-0 course-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="position-relative overflow-hidden">
                    <img
                      src={course.imageUrl}
                      className="card-img-top"
                      alt={course.category.name}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <span
                      className="badge position-absolute top-0 end-0 m-3"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: "15px",
                        padding: "6px 12px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {course.category.name}
                    </span>
                    <div
                      className="position-absolute bottom-0 start-0 end-0 p-3"
                      style={{
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.7))",
                      }}
                    >
                      <div className="text-white small">
                        <i className="bi bi-person-fill me-1"></i>
                        {course.instructor.name}
                      </div>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column p-4">
                    <h5
                      className="card-title fw-bold mb-3"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {course.title}
                    </h5>

                    <p
                      className="card-text text-muted small mb-3"
                      style={{ lineHeight: "1.5" }}
                    >
                      {course.description.length > 80
                        ? course.description.substring(0, 80) + "..."
                        : course.description}
                    </p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="text-warning small">
                          ⭐⭐⭐⭐⭐{" "}
                          <span className="text-dark fw-bold">4.8</span>
                        </div>
                        <div
                          className="fw-bold"
                          style={{
                            fontSize: "1.2rem",
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          ${course.price}
                        </div>
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
