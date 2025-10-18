import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../reducer/AuthReducer";
import { courseSelector, fetchUserCourses } from "../reducer/CourseReducer";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

export default function LearningPage() {
  const { isAuthenticated } = useSelector(authSelector);
  const { userCourses, isLoading } = useSelector(courseSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMyCourses = async () => {
      try {
        await dispatch(fetchUserCourses()).unwrap();
      } catch (err) {
        toast.error(
          "Problem fetching your courses, please check back again in sometime"
        );
      }
    };

    if (isAuthenticated) {
      getMyCourses();
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="container my-5">
        <h2 className="mb-4">
          <Skeleton width={200} />
        </h2>
        <div className="row">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                {/* Image placeholder */}
                <Skeleton height={160} />
                <div className="card-body d-flex flex-column">
                  {/* Title */}
                  <h5 className="card-title">
                    <Skeleton width={`80%`} />
                  </h5>

                  {/* Description */}
                  <p className="card-text">
                    <Skeleton count={2} />
                  </p>

                  <div className="mt-auto">
                    {/* Price */}
                    <p className="fw-bold mb-2">
                      <Skeleton width={60} />
                    </p>

                    {/* Button */}
                    <Skeleton height={40} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container my-5">
      <h2 className="mb-4">My Learning</h2>
      <div className="row">
        {userCourses ? (
          userCourses.map((course) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={course._id}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={course.imageUrl}
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{course.title}</h5>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {course.description?.length > 60
                      ? course.description.substring(0, 60) + "..."
                      : course.description}
                  </p>
                  <div className="mt-auto">
                    <p className="fw-bold mb-1">₹{course.price}</p>
                    <Link
                      to={`/mylearning/learn/courses/${course._id}`}
                      className="btn btn-primary w-100"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No courses enrolled yet.</p>
        )}
      </div>
    </div>
  );
}
