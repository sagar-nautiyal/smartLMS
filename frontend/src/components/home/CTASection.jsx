import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section
      className="py-5 text-center text-white"
      style={{
        background: "#0575E6" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(to right, #021B79, #0575E6)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(to right, #021B79, #0575E6)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
    >
      <div className="container">
        <h2 className="fw-bold mb-3">Ready to Start Learning?</h2>
        <p className="mb-4">
          Browse our complete library of courses and find the perfect one for
          you.
        </p>
        <Link to="/courses" className="btn btn-light btn-lg fw-semibold">
          Explore All Courses
        </Link>
      </div>
    </section>
  );
}
