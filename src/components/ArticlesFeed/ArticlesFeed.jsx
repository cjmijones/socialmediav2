// components/NewsFeed/NewsFeed.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/articlesSlice";
import ArticleCard from "../ArticleCard/ArticleCard";

const ArticlesFeed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const { articles, isLoading, error } = useSelector((state) => state.articles);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>Error loading articles: {error}</p>;

  return (
    <div className="main-content-area">
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesFeed;
