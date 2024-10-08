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
import NewsFeed from "./pages/NewsFeed/NewsFeed";

const Layout = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
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
        path: "/newsfeed",
        element: <NewsFeed />,
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
