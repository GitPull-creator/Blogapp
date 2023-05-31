import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { CreatePostDataType, UpdatePostDataType } from '../components/types/types';

interface InitialStateType {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
  loading: boolean;
}

const baseURL = 'https://blog.kata.academy/api/';

export const fetchCreatePost = createAsyncThunk(
  'singleArticle/fetchCreatePost',
  async (data: { authData: CreatePostDataType; token: string }) => {
    const { authData, token } = data;
    const response = await axios.post(
      `${baseURL}articles`,
      {
        article: authData,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

export const fetchDeletePost = createAsyncThunk(
  'singleArticle/fetchDeletepost',
  async (data: { slug: string; token: string }) => {
    const { slug, token } = data;
    const response = await axios.delete(
      `${baseURL}articles/${slug}`,

      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

export const fetchUpdatePost = createAsyncThunk(
  'singleArticle/fetchUpdatePost',
  async (authData: UpdatePostDataType) => {
    const response = await axios.put(
      `${baseURL}articles/${authData.slug}`,
      {
        article: authData.updateData,
      },
      {
        headers: {
          Authorization: `Token ${authData.token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

export const fetchSetLike = createAsyncThunk(
  'singleArticle/fetchSetLike',
  async (data: { slug: string; token: string }) => {
    const { slug, token } = data;
    const response = await axios.post(
      `${baseURL}articles/${slug}/favorite`,
      {
        body: '',
      },

      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

export const fetchRemoveLike = createAsyncThunk(
  'singleArticle/fetchRemoveLike',
  async (data: { slug: string; token: string }) => {
    const { slug, token } = data;
    const response = await axios.delete(
      `${baseURL}articles/${slug}/favorite`,

      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

const initialState: InitialStateType = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: ['a', 'a'],
  },
  loading: false,
};

const singleArticleSlice = createSlice({
  name: 'singleArticle',
  initialState,
  reducers: {
    setCurrentPage(state) {
      state.article.title = 'sd';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreatePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchSetLike.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export default singleArticleSlice.reducer;
