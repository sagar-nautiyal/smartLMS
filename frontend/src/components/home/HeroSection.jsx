import { Link } from "react-router-dom";
import illustration from "../../assets/login.svg";
export default function HeroSection() {
  return (
    <section
      className="hero-section text-white text-center text-md-start py-5 position-relative"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "500px",
      }}
    >
      <div
        className="container d-flex flex-column flex-md-row align-items-center justify-content-between position-relative"
        style={{ zIndex: 2 }}
      >
        {/* Text Content */}
        <div className="mb-4 mb-md-0" style={{ maxWidth: "600px" }}>
          <h1
            className="display-4 fw-bold mb-4"
            style={{ fontSize: "3.5rem", lineHeight: "1.2" }}
          >
            Learn Smarter, Not Harder
            <span
              className="d-block"
              style={{
                fontSize: "2.5rem",
                background: "linear-gradient(45deg, #ffd89b 0%, #19547b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginTop: "10px",
              }}
            >
              with SmartLMS
            </span>
          </h1>
          <p
            className="lead mb-4"
            style={{ fontSize: "1.3rem", opacity: "0.95" }}
          >
            🚀 Your personalized learning platform — track progress, master
            skills, and achieve your goals at your own pace.
          </p>
          <div className="d-flex gap-3 justify-content-center justify-content-md-start flex-wrap">
            <Link
              to="/courses"
              className="btn btn-light btn-lg fw-semibold interactive-element"
              style={{
                color: "#667eea",
                padding: "15px 30px",
                borderRadius: "50px",
                boxShadow: "0 8px 25px rgba(255,255,255,0.2)",
                border: "none",
                fontSize: "1.1rem",
              }}
            >
              🎯 Start Learning
            </Link>
            <button
              className="btn btn-outline-light btn-lg interactive-element"
              style={{
                padding: "15px 30px",
                borderRadius: "50px",
                border: "2px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                fontSize: "1.1rem",
              }}
            >
              📚 Learn More
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="text-center">
          <img
            src={illustration}
            alt="Learning illustration"
            className="img-fluid rounded shadow-lg"
            style={{
              maxHeight: "400px",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))",
              borderRadius: "20px",
            }}
          />
        </div>
      </div>
    </section>
  );
}
