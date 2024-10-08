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
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 px-6 border-x-2 border-t-slate-800">
            <ArticlesFeed />
          </div>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default NewsFeed;
