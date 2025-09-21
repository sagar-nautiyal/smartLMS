import { Link } from "react-router-dom";
import illustration from "../../assets/login.svg";
export default function HeroSection() {
  return (
    <section className="bg-primary text-white text-center text-md-start py-5">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        {/* Text Content */}
        <div className="mb-4 mb-md-0">
          <h1 className="display-4 fw-bold">Learn Smarter, Not Harder</h1>
          <p className="lead">
            Your personalized LMS — track progress, take quizzes, and master
            skills at your own pace.
          </p>
          <div className="d-flex gap-2 justify-content-center justify-content-md-start">
            <Link
              to="/login"
              className="btn btn-light btn-lg text-primary fw-semibold"
            >
              Get Started
            </Link>
            <button className="btn btn-outline-light btn-lg">Learn More</button>
          </div>
        </div>

        {/* Hero Image */}
        <div>
          <img
            src={illustration}
            alt="Learning illustration"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </section>
  );
}
