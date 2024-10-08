import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Signin from "../SignIn/SignIn";

import { useSelector } from "react-redux";
import ArticlesFeed from "../../components/ArticlesFeed/ArticlesFeed";

const NewsFeed = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="left-sidebar px-6 md:col-span-1">
            <LeftSidebar />
          </div>
          <div className="main-content border-x-2 border-t-slate-800 px-6 md:col-span-2">
            <ArticlesFeed />
          </div>
          <div className="right-sidebar px-6 md:col-span-1">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default NewsFeed;
