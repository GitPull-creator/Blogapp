import { configureStore } from '@reduxjs/toolkit';

import article from './articlesSlice';
import user from './userSlice';
import singleArticle from './singleArticleSlice';

export const store = configureStore({
  reducer: { article, singleArticle, user },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
