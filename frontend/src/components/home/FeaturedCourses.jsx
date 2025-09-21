import { Link } from "react-router-dom";

export default function FeaturedCourses() {
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
          {/* Course 1 */}
          <div className="col-12 col-sm-6 col-lg-3">
            <Link to="/courses/1" className="text-decoration-none text-dark">
              <div className="card h-100 shadow-lg border-0">
                <div className="position-relative">
                  <img
                    src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&auto=format&fit=crop&q=60"
                    className="card-img-top"
                    alt="Web Development"
                  />
                  <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                    Technology
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Full‑Stack Web Development</h5>
                  <p className="card-text text-muted small">
                    Learn HTML, CSS, JavaScript, and backend development.
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center small text-muted mb-1">
                      <span>
                        ⭐⭐⭐⭐⭐ <strong>4.8</strong>
                      </span>
                      <span className="fw-bold text-primary">$49.99</span>
                    </div>
                    <div className="text-end small text-muted">By John Doe</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Course 2 */}
          <div className="col-12 col-sm-6 col-lg-3">
            <Link to="/courses/2" className="text-decoration-none text-dark">
              <div className="card h-100 shadow-lg border-0">
                <div className="position-relative">
                  <img
                    src="https://media.istockphoto.com/id/2200128716/photo/ai-powers-big-data-analysis-and-automation-workflows-showcasing-neural-networks-and-data.webp?a=1&b=1&s=612x612&w=0&k=20&c=Wct3RqstuZiHOEexd0kSDNufRHJZ_ZcCeBUAkbWKjDo="
                    className="card-img-top"
                    alt="Data Science"
                  />
                  <span className="badge bg-success position-absolute top-0 end-0 m-2">
                    Data Science
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Data Science Essentials</h5>
                  <p className="card-text text-muted small">
                    Master Python, Pandas, and machine learning basics.
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center small text-muted mb-1">
                      <span>
                        ⭐⭐⭐⭐☆ <strong>4.7</strong>
                      </span>
                      <span className="fw-bold text-primary">$59.99</span>
                    </div>
                    <div className="text-end small text-muted">
                      By Jane Smith
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Course 3 */}
          <div className="col-12 col-sm-6 col-lg-3">
            <Link to="/courses/3" className="text-decoration-none text-dark">
              <div className="card h-100 shadow-lg border-0">
                <div className="position-relative">
                  <img
                    src="https://media.istockphoto.com/id/2163446076/photo/top-view-of-smart-business-team-write-graphic-logo-on-meeting-table-symposium.webp?a=1&b=1&s=612x612&w=0&k=20&c=X2ghlTZFhO5mXgV1CZYLob6nfLwOo_kK6eqgXAoR534="
                    className="card-img-top"
                    alt="Graphic Design"
                  />
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                    Design
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Graphic Design Masterclass</h5>
                  <p className="card-text text-muted small">
                    Learn Photoshop, Illustrator, and design principles.
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center small text-muted mb-1">
                      <span>
                        ⭐⭐⭐⭐☆ <strong>4.6</strong>
                      </span>
                      <span className="fw-bold text-primary">$39.99</span>
                    </div>
                    <div className="text-end small text-muted">By Alex Lee</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Course 4 */}
          <div className="col-12 col-sm-6 col-lg-3">
            <Link to="/courses/4" className="text-decoration-none text-dark">
              <div className="card h-100 shadow-lg border-0">
                <div className="position-relative">
                  <img
                    src="https://media.istockphoto.com/id/2174029643/photo/confident-speaker-presenting-to-engaged-audience-at-business-event.webp?a=1&b=1&s=612x612&w=0&k=20&c=5-kmFoFvaElQG2p0X6MriYlZXYzCV_FEc38UozQCI6U="
                    className="card-img-top"
                    alt="Language Learning"
                  />
                  <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                    Languages
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Spanish for Beginners</h5>
                  <p className="card-text text-muted small">
                    Build vocabulary and conversational skills in Spanish.
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center small text-muted mb-1">
                      <span>
                        ⭐⭐⭐⭐⭐ <strong>4.9</strong>
                      </span>
                      <span className="fw-bold text-primary">$29.99</span>
                    </div>
                    <div className="text-end small text-muted">
                      By Maria Gomez
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
