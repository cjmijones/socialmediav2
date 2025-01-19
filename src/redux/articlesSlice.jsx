// redux/articlesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

// Thunks for asynchronous actions

// Fetch articles
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/articles?page=${page}&limit=${limit}`);
      return response.data; // This now includes articles and pagination info
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Like or unlike an article
export const likeArticle = createAsyncThunk(
  "articles/likeArticle",
  async (articleId, { rejectWithValue }) => {
    const token = localStorage.getItem("token"); // Use the correct key

    console.log("Token associated with like article function", token);

    if (!token) {
      return rejectWithValue("User not authenticated");
    }
    try {
      const response = await api.post(
        `/articles/${articleId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { articleId, likes: response.data.likes };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add a comment to an article
export const addComment = createAsyncThunk(
  "articles/addComment",
  async ({ articleId, comment }, { rejectWithValue }) => {
    const token = localStorage.getItem("token"); // Use the correct key

    if (!token) {
      return rejectWithValue("User not authenticated");
    }
    try {
      console.log("Trying to post comment: ", comment);
      const response = await api.post(
        `/articles/${articleId}/comment`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { articleId, comments: response.data.comments };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Edit a comment
export const editComment = createAsyncThunk(
  "articles/editComment",
  async ({ articleId, commentId, comment }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("User not authenticated");
    }
    try {
      const response = await api.put(
        `/articles/${articleId}/comments/${commentId}`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { articleId, comments: response.data.comments };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
  "articles/deleteComment",
  async ({ articleId, commentId }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("User not authenticated");
    }
    try {
      const response = await api.delete(
        `/articles/${articleId}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return { articleId, comments: response.data.comments };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  articles: [],
  isLoading: false,
  error: null,
  totalArticles: 0,
  currentPage: 1,
  totalPages: 1,
  hasMore: true,
};

// Articles slice
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch articles
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = [...state.articles, ...action.payload.articles];
        state.totalArticles = action.payload.totalArticles;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Like article
      .addCase(likeArticle.fulfilled, (state, action) => {
        const { articleId, likes } = action.payload;
        const article = state.articles.find((a) => a._id === articleId);
        if (article) {
          article.likes = likes;
        }
      })
      .addCase(likeArticle.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { articleId, comments } = action.payload;
        const article = state.articles.find((a) => a._id === articleId);
        if (article) {
          article.comments = comments;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Edit comment
      .addCase(editComment.fulfilled, (state, action) => {
        const { articleId, comments } = action.payload;
        const article = state.articles.find((a) => a._id === articleId);
        if (article) {
          article.comments = comments;
        }
      })
      .addCase(editComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { articleId, comments } = action.payload;
        const article = state.articles.find((a) => a._id === articleId);
        if (article) {
          article.comments = comments;
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default articlesSlice.reducer;
