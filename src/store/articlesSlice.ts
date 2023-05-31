import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { ArticleType } from '../components/types/types';

interface ArticlesState {
  articlesData: ArticleType[];
  total: number;
  loading: boolean;
  articleLoading: boolean;
  currentPage: number;
  currentArticle: ArticleType;
}

const initialState: ArticlesState = {
  articlesData: [],
  total: 1,
  loading: false,
  articleLoading: false,
  currentPage: 1,
  currentArticle: {
    author: {
      username: '',
      image: '',
      following: false,
    },
    body: '',
    createdAt: '',
    description: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
    tagList: [],
    title: '',
    updatedAt: '',
  },
};

const baseURL = 'https://blog.kata.academy/api/';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (data: { token: string; offset: number }) => {
    const { offset, token } = data;
    const response = await axios.get(`${baseURL}articles?limit=5&offset=${offset}`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

export const fetchSoloArticle = createAsyncThunk(
  'articles/fetchSoloArticle',
  async (data: { slug: string; token: string }) => {
    const { slug, token } = data;
    const response = await axios.get(`${baseURL}articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.article;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articlesData = action.payload.articles;
        state.total = action.payload.articlesCount;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.loading = true;
      })
      .addCase(fetchSoloArticle.pending, (state) => {
        state.articleLoading = true;
      })
      .addCase(fetchSoloArticle.fulfilled, (state, action) => {
        state.articleLoading = false;
        state.currentArticle = action.payload;
      });
  },
});

export const { setCurrentPage } = articlesSlice.actions;
export default articlesSlice.reducer;
