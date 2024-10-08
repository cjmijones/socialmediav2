// components/CommentsSection/CommentsSection.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  editComment,
  deleteComment,
} from "../../redux/articlesSlice";

const CommentsSection = ({ article }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      console.log(commentText.trim());
      dispatch(
        addComment({ articleId: article._id, comment: commentText.trim() })
      );
      setCommentText("");
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditText(commentText);
  };

  const handleSaveEdit = (commentId) => {
    dispatch(
      editComment({
        articleId: article._id,
        commentId,
        comment: editText.trim(),
      })
    );
    setEditingCommentId(null);
    setEditText("");
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ articleId: article._id, commentId }));
  };

  return (
    <div className="comments-section mt-4">
      <h3 className="text-lg font-semibold">
        Comments ({article.comments.length})
      </h3>
      {currentUser && (
        <form onSubmit={handleAddComment} className="my-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            required
            maxLength={240}
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Post Comment
          </button>
        </form>
      )}
      <ul className="mt-2">
        {article.comments.map((comment) => (
          <li key={comment._id} className="border-b py-2">
            <strong>{comment.username}:</strong>{" "}
            {editingCommentId === comment._id ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  maxLength={240}
                  className="w-full p-2 border rounded"
                ></textarea>
                <button
                  onClick={() => handleSaveEdit(comment._id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCommentId(null)}
                  className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {comment.comment}
                <em className="text-gray-600">
                  {" "}
                  ({new Date(comment.createdAt).toLocaleString()})
                  {comment.editHistory && comment.editHistory.length > 0
                    ? " (Edited)"
                    : ""}
                </em>
                {currentUser && currentUser._id === comment.user && (
                  <>
                    <button
                      onClick={() =>
                        handleEditComment(comment._id, comment.comment)
                      }
                      className="ml-2 text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
