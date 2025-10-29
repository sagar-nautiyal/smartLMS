import { Link } from "react-router-dom";

export default function CategorySection() {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2
            className="fw-bold text-gradient mb-3"
            style={{ fontSize: "2.5rem" }}
          >
            🎯 Browse Categories
          </h2>
          <p className="text-muted fs-5">
            Explore our diverse range of courses across multiple domains
          </p>
        </div>
        <div className="row g-4">
          {/* Technology */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <Link className="text-decoration-none">
              <div
                className="card h-100 border-0 text-center p-4 category-card"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: "20px",
                }}
              >
                <div
                  className="mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <i className="bi bi-laptop display-6"></i>
                </div>
                <h5 className="card-title fw-bold">Technology</h5>
                <p className="card-text small opacity-75">
                  12 Courses Available
                </p>
              </div>
            </Link>
          </div>

          {/* Business */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <Link className="text-decoration-none">
              <div
                className="card h-100 border-0 text-center p-4 category-card"
                style={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                  borderRadius: "20px",
                }}
              >
                <div
                  className="mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <i className="bi bi-bar-chart display-6"></i>
                </div>
                <h5 className="card-title fw-bold">Business</h5>
                <p className="card-text small opacity-75">
                  8 Courses Available
                </p>
              </div>
            </Link>
          </div>

          {/* Design */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <Link className="text-decoration-none">
              <div
                className="card h-100 border-0 text-center p-4 category-card"
                style={{
                  background:
                    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                  color: "#8b4513",
                  borderRadius: "20px",
                }}
              >
                <div
                  className="mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(139,69,19,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <i className="bi bi-brush display-6"></i>
                </div>
                <h5 className="card-title fw-bold">Design</h5>
                <p className="card-text small opacity-75">
                  5 Courses Available
                </p>
              </div>
            </Link>
          </div>

          {/* Languages */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <Link className="text-decoration-none">
              <div
                className="card h-100 border-0 text-center p-4 category-card"
                style={{
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "white",
                  borderRadius: "20px",
                }}
              >
                <div
                  className="mb-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <i className="bi bi-translate display-6"></i>
                </div>
                <h5 className="card-title fw-bold">Languages</h5>
                <p className="card-text small opacity-75">
                  7 Courses Available
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
