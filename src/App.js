import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import Signin from "./pages/SignIn/SignIn";
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error/Error";
import TokenExpiryChecker from "./components/TokenExpiryChecker/TokenExpiryChecker";

const Layout = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="md:w-8/12 mx-auto">
      {/* Token expiry checker */}
      <TokenExpiryChecker />
      {/* Conditionally render Navbar */}
      {currentUser && (
        <h1>
          <Navbar />
        </h1>
      )}
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
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
