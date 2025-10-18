import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { courseSelector, fetchCurrentCourse } from "../reducer/CourseReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

export default function LessonPlayer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, isLoading } = useSelector(courseSelector);
  const [selectedLesson, setSelectedLesson] = useState(null);

  //fetch the course
  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentCourse({ courseId: id }));
    }
  }, [dispatch, id]);

  //get currentCourse when state changes

  useEffect(() => {
    if (currentCourse) {
      toast.success(`Loaded course: ${currentCourse.title}`);
    }
  }, [currentCourse]);

  if (isLoading) {
    return (
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar Skeleton */}
          <aside className="col-12 col-md-4 col-lg-3 border-end vh-100 p-3">
            <h5>
              <Skeleton width={200} />
            </h5>
            <div className="mb-3">
              <Skeleton width={150} />
            </div>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Skeleton width={180} />
              </li>
              <li className="mb-2">
                <Skeleton width={160} />
              </li>
              <li className="mb-2">
                <Skeleton width={140} />
              </li>
            </ul>
            <div className="mt-4">
              <Skeleton width={150} />
            </div>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Skeleton width={180} />
              </li>
              <li className="mb-2">
                <Skeleton width={160} />
              </li>
            </ul>
          </aside>

          {/* Main Video Area Skeleton */}
          <main className="col-12 col-md-8 col-lg-9 p-4">
            <h4>
              <Skeleton width={300} />
            </h4>
            <div className="mb-3">
              <Skeleton height={400} /> {/* Video player placeholder */}
            </div>
            <p>
              <Skeleton width={250} />
            </p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar: Lessons */}
        <aside className="col-12 col-md-4 col-lg-3 border-end vh-100 overflow-auto p-3">
          <h5 className="fw-bold mb-3">{currentCourse?.title}</h5>
          {currentCourse?.modules?.map((module, mIndex) => (
            <div key={mIndex} className="mb-3">
              <h6 className="fw-semibold">{module.title}</h6>
              <ul className="list-group list-group-flush">
                {module.lessons.map((lesson, lIndex) => (
                  <li
                    key={lIndex}
                    className={`list-group-item list-group-item-action ${
                      selectedLesson?.title === lesson.title ? "active" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main Content: Video Player */}
        <main className="col-12 col-md-8 col-lg-9 p-4">
          {selectedLesson ? (
            <>
              <h4 className="fw-bold mb-3">{selectedLesson.title}</h4>
              <div className="ratio ratio-16x9 mb-3">
                {/* Replace with your video player integration */}
                <iframe
                  src={selectedLesson.videoUrl}
                  title={selectedLesson.title}
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-muted">
                Now playing: <strong>{selectedLesson.title}</strong>
              </p>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
              <p>Select a lesson from the left to start learning</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
