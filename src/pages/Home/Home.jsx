import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import MainTweet from "../../components/MainTweet/MainTweet";
import SignIn from "../SignIn/SignIn.jsx";
import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  console.log("user: ", currentUser);
  return (
    <>
      {!currentUser ? (
        <SignIn />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="left-sidebar-wrapper md:col-span-1">
            <LeftSidebar />
          </div>
          <div className="main-content-wrapper md:col-span-2">
            <MainTweet />
          </div>
          <div className="right-sidebar-wrapper md:col-span-1">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
