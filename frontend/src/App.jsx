import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import RootLayout from "./components/layouts/RootLayout";
import RegisterUser from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, fetchCurrentUser } from "./reducer/AuthReducer";
import PrivateRoute from "./components/PrivateRoute";
import LearningPage from "./pages/LearningPage";
import CheckoutPage from "./pages/CheckoutPage";
import LessonPlayer from "./pages/LessonPlayer";
import UserProfilePage from "./pages/UserProfilePage";
import CheckoutSuccessPage from "./components/course/CheckoutSuccessPage";
import CartPage from "./pages/CartPage";

function App() {
  const { isLoading } = useSelector(authSelector);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <h1>
  //         <Skeleton width={300} />
  //       </h1>
  //       <p>
  //         <Skeleton count={3} />
  //       </p>
  //       <p>
  //         <Skeleton width={200} />
  //       </p>
  //       <p>
  //         <Skeleton width={150} />
  //       </p>
  //       <div>
  //         <Skeleton width={100} height={40} style={{ marginRight: 10 }} />
  //         <Skeleton width={100} height={40} />
  //       </div>
  //     </div>
  //   );
  // }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },

        // Courses
        {
          path: "courses",
          children: [
            { index: true, element: <CoursesPage /> },
            { path: ":courseId", element: <CourseDetailPage /> },

            // ✅ Buy Now → single course checkout
            {
              path: ":courseId/checkout",
              element: (
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              ),
            },
          ],
        },

        // ✅ Cart flow
        {
          path: "cart",
          element: (
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          ),
        },
        {
          path: "cart/checkout",
          element: (
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          ),
        },

        // ✅ My Learning
        {
          path: "myLearning",
          element: (
            <PrivateRoute>
              <LearningPage />
            </PrivateRoute>
          ),
        },
        {
          path: "myLearning/learn/courses/:id",
          element: (
            <PrivateRoute>
              <LessonPlayer />
            </PrivateRoute>
          ),
        },

        // ✅ User Profile
        {
          path: "user",
          element: (
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          ),
        },
      ],
    },

    // Auth
    { path: "login", element: <Login /> },
    { path: "register", element: <RegisterUser /> },

    // ✅ Stripe success page
    { path: "checkout-success", element: <CheckoutSuccessPage /> },
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
