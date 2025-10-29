import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section
      className="py-5 text-center text-white position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "300px"
      }}
    >
      {/* Background Pattern */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
        <div style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          height: '100%'
        }}></div>
      </div>
      
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-4" style={{ fontSize: '2.5rem' }}>
              🚀 Ready to Start Learning?
            </h2>
            <p className="mb-4 fs-5" style={{ opacity: '0.9' }}>
              Join thousands of learners worldwide. Browse our complete library of courses 
              and find the perfect one to advance your skills.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link 
                to="/courses" 
                className="btn btn-light btn-lg fw-semibold interactive-element px-5"
                style={{
                  borderRadius: '50px',
                  color: '#667eea',
                  boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
                  fontSize: '1.1rem'
                }}
              >
                🎯 Explore All Courses
              </Link>
              <Link 
                to="/register" 
                className="btn btn-outline-light btn-lg fw-semibold interactive-element px-5"
                style={{
                  borderRadius: '50px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '1.1rem'
                }}
              >
                📝 Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
