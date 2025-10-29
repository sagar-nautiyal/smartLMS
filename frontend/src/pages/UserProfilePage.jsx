import { useDispatch, useSelector } from "react-redux";
import { authSelector, updateUserInfo } from "../reducer/AuthReducer";
import { toast } from "react-toastify";
export default function UserProfilePage() {
  const { currentUser, isAuthenticated } = useSelector(authSelector);
  const dispatch = useDispatch();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");

    try {
      await dispatch(updateUserInfo({ name, email })).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Error while updating user info");
    }
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          {isAuthenticated && (
            <div className="card border-0 p-4" 
                 style={{ 
                   borderRadius: '20px',
                   boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                   background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                 }}>
              <div className="row g-4 align-items-center">
                {/* Left: Profile Image */}
                <div className="col-12 col-md-4 text-center">
                  <div className="position-relative d-inline-block mb-3">
                    <img
                      src="https://a.storyblok.com/f/191576/2400x1260/fd054dca6a/round_profile_picture_og_image.webp"
                      alt="User Avatar"
                      className="rounded-circle img-fluid"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        border: '4px solid white',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                      }}
                    />

                  </div>

                </div>

                {/* Right: Profile Form */}
                <div className="col-12 col-md-8">
                  <h4 className="fw-bold mb-4 text-gradient" style={{ fontSize: '1.8rem' }}>
                    👤 Profile Details
                  </h4>
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        defaultValue={currentUser?.name}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        defaultValue={currentUser?.email}
                        placeholder="Enter your email"
                        disabled
                      />
                    </div>

                    {/* Future fields can be added here */}

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary px-5 py-2 rounded-pill interactive-element">
                        <i className="bi bi-check2-circle me-2"></i>
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
