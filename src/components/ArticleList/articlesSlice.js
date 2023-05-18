import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from "../../constants/StatusTypes";
import formatArticle from "../../utilites/formatArticle";

const initialState = {
  articles: [],
  articlesCount: 0,
  articlesLoadingStatus: IDLE_STATUS,
};

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async (page) => {
  const baseURL = "https://blog.kata.academy/api/";
  const limit = 5;
  const newPage = (page - 1) * limit;

  try {
    const res = await fetch(`${baseURL}articles?limit=${limit}&offset=${newPage}`);

    if (!res.ok) {
      if (res.status === 500) {
        throw new Error("500", "Ошибка на сервере!");
      }

      throw new Error(`Could not fetch articles, status ${res.status}`);
    }

    const data = await res.json();
    const articles = data.articles.map(formatArticle);
    return { ...data, articles };
  } catch (err) {
    throw err.message;
  }
});

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.articlesLoadingStatus = LOADING_STATUS;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.articlesLoadingStatus = SUCCESS_STATUS;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.articlesLoadingStatus = FAILURE_STATUS;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = articlesSlice;

export default reducer;

export const { articlesFetched, articlesFetching, articlesFetchingError } = actions;
