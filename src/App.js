import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/userSlice";

import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Signin from "./pages/SignIn/SignIn";
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error/Error";

const Layout = () => {
  return (
    <div className="md:w-8/12 mx-auto">
      {/* Dummy navbar */}
      <h1>
        <Navbar />
      </h1>
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/explore/",
        element: <Explore />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signout",
        element: <Signin />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      dispatch(logout());
      navigate("/signin");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        dispatch(logout());
        navigate("/signin");
      }
    };

    const interval = setInterval(checkTokenExpiry, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
