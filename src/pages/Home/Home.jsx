import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import MainTweet from "../../components/MainTweet/MainTweet";
import SignIn from "../SignIn/SignIn.jsx";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  console.log("user: ", currentUser);
  return (
    <>
      {!currentUser ? (
        <SignIn />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="left-sidebar px-6 md:col-span-1">
            <LeftSidebar />
          </div>
          <div className="main-content border-x-2 border-t-slate-800 px-6 md:col-span-2">
            <MainTweet />
          </div>
          <div className="right-sidebar px-6 md:col-span-1">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
