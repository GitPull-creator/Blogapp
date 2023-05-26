import { configureStore } from '@reduxjs/toolkit';

import articlesSlice from './articlesSlice';
import userSlice from './userSlice';
import singleArticleSlice from './singleArticleSlice';

export const store = configureStore({
  reducer: { article: articlesSlice, singleArticle: singleArticleSlice, user: userSlice },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
