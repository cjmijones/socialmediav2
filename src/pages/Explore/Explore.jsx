import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import ExploreTweets from "../../components/ExploreTweets/ExploreTweets";
import Signin from "../SignIn/SignIn";

import { useSelector } from "react-redux";

const Explore = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="left-sidebar-wrapper px-6 md:col-span-1">
            <LeftSidebar />
          </div>
          <div className="main-content-wrapper border-x-2 border-t-slate-800 px-6 md:col-span-2">
            <ExploreTweets />
          </div>
          <div className="right-sidebar-wrapper px-6 md:col-span-1">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
