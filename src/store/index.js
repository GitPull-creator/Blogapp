import { configureStore } from "@reduxjs/toolkit";

import articles from "../components/ArticleList/articlesSlice";
import article from "../components/SingleArticle/articleSlice";

const store = configureStore({
  reducer: { articles, article },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
