// components/NewsFeed/NewsFeed.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/articlesSlice";
import ArticleCard from "../ArticleCard/ArticleCard";

const ArticlesFeed = () => {
  const dispatch = useDispatch();
  const limit = 5; // Number of articles per page
  const { articles, isLoading, error, currentPage, hasMore } = useSelector(
    (state) => state.articles
  );

  useEffect(() => {
    dispatch(fetchArticles({ page: 1, limit }));
  }, [dispatch]);

  const loadMore = () => {
    if (hasMore && !isLoading) {
      dispatch(fetchArticles({ page: currentPage + 1, limit }));
    }
  };

  if (error) return <p>Error loading articles: {error}</p>;

  return (
    <div className="main-content-area">
      <div>
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
        {isLoading && <p>Loading more articles...</p>}
        {hasMore ? (
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-blue-500 
                       text-white 
                       py-2 px-4
                       rounded-full
                       ml-auto mt-2
                       justify-center"
          >
            Load More
          </button>
        ) : (
          <p>No more articles to load.</p>
        )}
      </div>
    </div>
  );
};

export default ArticlesFeed;
