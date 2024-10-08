// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import articlesReducer from "./articlesSlice.jsx"; // Import the articles slice

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["articles"], // We may not need to persist articles
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  articles: articlesReducer, // Add articles reducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Determine development mode
const devMode = process.env.NODE_ENV !== "production";

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

// Export persistor
export const persistor = persistStore(store);
