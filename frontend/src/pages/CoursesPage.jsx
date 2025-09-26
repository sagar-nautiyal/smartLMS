import { Link } from "react-router-dom";
export default function CoursesPage() {
  return (
    <>
      <div className="container my-5">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 text-dark">
            Unlock Your Next Chapter of Learning
          </h2>
          <p className="text-muted fs-5 mt-2">
            Explore curated courses designed to inspire, challenge, and
            transform your skills.
          </p>
        </div>

        <div className="row g-4">
          {/* Sidebar with Search + Filters */}
          <aside className="col-12 col-md-3">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="input-group shadow-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search courses..."
                  aria-label="Search courses"
                />
                <button className="btn btn-primary" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>

            {/* Filter Box */}
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-3 text-primary">Filter Courses</h5>
                {/* Category */}
                <div className="mb-3">
                  <h6 className="fw-semibold text-secondary">Category</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="web"
                    />
                    <label className="form-check-label" htmlFor="web">
                      Web Development
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="cs"
                    />
                    <label className="form-check-label" htmlFor="cs">
                      Computer Science
                    </label>
                  </div>
                </div>
                {/* Level */}
                <div className="mb-3">
                  <h6 className="fw-semibold text-secondary">Level</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="level"
                      id="beginner"
                    />
                    <label className="form-check-label" htmlFor="beginner">
                      Beginner
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="level"
                      id="advanced"
                    />
                    <label className="form-check-label" htmlFor="advanced">
                      Advanced
                    </label>
                  </div>
                </div>
                {/* Price */}
                <div className="mb-3">
                  <h6 className="fw-semibold text-secondary">Price</h6>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="100"
                  />
                  <small className="text-muted">Up to $100</small>
                </div>
                <button className="btn btn-primary w-100">Apply Filters</button>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <div className="col-12 col-md-9">
            <div className="row g-4">
              {/* Course 1 */}
              <div className="col-12 col-md-6 d-flex">
                <div
                  className="card flex-fill border-0 bg-white shadow-sm hover-shadow-lg hover-scale transition position-relative"
                  style={{ cursor: "pointer" }}
                >
                  {/* Category Badge */}
                  <span className="badge bg-primary position-absolute top-0 end-0 mt-3 me-3">
                    Web Dev
                  </span>
                  <img
                    src="https://via.placeholder.com/500x300"
                    className="card-img-top"
                    alt="Course 1"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold fs-4 text-dark">
                      Intro to Web Dev
                    </h5>
                    <p className="card-text text-muted small flex-grow-1">
                      Learn HTML, CSS, and JS basics with hands‑on projects.
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold text-primary fs-5">$29.99</span>
                      <Link to="/courses/1" className="btn btn-primary btn-sm">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course 2 */}
              <div className="col-12 col-md-6 d-flex">
                <div
                  className="card flex-fill border-0 bg-white shadow-sm hover-shadow-lg hover-scale transition position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <span className="badge bg-success position-absolute top-0 end-0 mt-3 me-3">
                    Computer Science
                  </span>
                  <img
                    src="https://via.placeholder.com/500x300"
                    className="card-img-top"
                    alt="Course 2"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold fs-4 text-dark">
                      Data Structures
                    </h5>
                    <p className="card-text text-muted small flex-grow-1">
                      Master arrays, stacks, queues, and linked lists.
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold text-primary fs-5">$39.99</span>
                      <Link to="/courses/2" className="btn btn-primary btn-sm">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course 3 */}
              <div className="col-12 col-md-6 d-flex">
                <div
                  className="card flex-fill border-0 bg-white shadow-sm hover-shadow-lg hover-scale transition position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 mt-3 me-3">
                    Frontend
                  </span>
                  <img
                    src="https://via.placeholder.com/500x300"
                    className="card-img-top"
                    alt="Course 3"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold fs-4 text-dark">
                      React Essentials
                    </h5>
                    <p className="card-text text-muted small flex-grow-1">
                      Build modern UIs with components, hooks, and state.
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold text-primary fs-5">$49.99</span>
                      <Link to="/courses/3" className="btn btn-primary btn-sm">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course 4 */}
              <div className="col-12 col-md-6 d-flex">
                <div
                  className="card flex-fill border-0 bg-white shadow-sm hover-shadow-lg hover-scale transition position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <span className="badge bg-danger position-absolute top-0 end-0 mt-3 me-3">
                    Backend
                  </span>
                  <img
                    src="https://via.placeholder.com/500x300"
                    className="card-img-top"
                    alt="Course 4"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold fs-4 text-dark">
                      Backend with Node.js
                    </h5>
                    <p className="card-text text-muted small flex-grow-1">
                      Learn to build scalable APIs with Express and MongoDB.
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold text-primary fs-5">$59.99</span>
                      <Link to="/courses/4" className="btn btn-primary btn-sm">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
