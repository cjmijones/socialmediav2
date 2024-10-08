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
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="main-content border-x-2 border-t-slate-800 px-6">
            <MainTweet />
          </div>
          <div className="px-6 col-span-1 w-full">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
