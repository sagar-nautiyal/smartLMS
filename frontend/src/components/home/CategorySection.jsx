import { Link } from "react-router-dom";

export default function CategorySection() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold">Browse Categories</h2>
        <div className="row g-4">
          {/* Technology */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link
              to="/courses/category/technology"
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm border-0 text-center p-3">
                <i className="bi bi-laptop display-4 text-primary mb-3"></i>
                <h5 className="card-title">Technology</h5>
                <p className="card-text text-muted small mb-1">12 Courses</p>
              </div>
            </Link>
          </div>

          {/* Business */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link
              to="/courses/category/business"
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm border-0 text-center p-3">
                <i className="bi bi-bar-chart display-4 text-success mb-3"></i>
                <h5 className="card-title">Business</h5>
                <p className="card-text text-muted small mb-1">8 Courses</p>
              </div>
            </Link>
          </div>

          {/* Design */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link
              to="/courses/category/design"
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm border-0 text-center p-3">
                <i className="bi bi-brush display-4 text-warning mb-3"></i>
                <h5 className="card-title">Design</h5>
                <p className="card-text text-muted small mb-1">5 Courses</p>
              </div>
            </Link>
          </div>

          {/* Languages */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link
              to="/courses/category/languages"
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm border-0 text-center p-3">
                <i className="bi bi-translate display-4 text-danger mb-3"></i>
                <h5 className="card-title">Languages</h5>
                <p className="card-text text-muted small mb-1">7 Courses</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
