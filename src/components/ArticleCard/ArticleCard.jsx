// components/ArticleCard/ArticleCard.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeArticle } from "../../redux/articlesSlice";
import CommentsSection from "../CommentsSection/CommentsSection.jsx";

const ArticleCard = ({ article }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLike = () => {
    console.log("Article ID to be liked/unliked", article._id);
    dispatch(likeArticle(article._id));
  };

  const userId = currentUser?._id;

  // console.log("This is the user ID generated for the article card", userId);

  const isLiked = article.likes.includes(userId);

  return (
    <div className="article-card p-4 mb-4">
      <h2 className="text-xl font-bold">{article.title}</h2>
      <p>{article.description}</p>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="my-4" />
      )}
      <p>{article.content}</p>
      <p className="text-gray-600">
        Source: {article.source.name} | Published At:{" "}
        {new Date(article.publishedAt).toLocaleString()}
      </p>
      <button
        onClick={handleLike}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isLiked ? "Unlike" : "Like"} ({article.likes.length})
      </button>
      <CommentsSection article={article} />
    </div>
  );
};

export default ArticleCard;
