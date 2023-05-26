import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from '../types/hooks';
import Articles from '../Articles/Articles';
import Layout from '../Layout/Layout';
import ArticlePage from '../ArticlePage/ArticlePage';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import { setsIsLoggedIn } from '../../store/userSlice';
import Profile from '../Profile/Profile';
import CreateArticle from '../CreateArticle/CreateArticle';
import EditArticle from '../EditArticle/EditArticle';
import NotFound from '../NotFound/NotFound';

import classes from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setsIsLoggedIn());
    }
  }, []);

  return (
    <div className={classes.App}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Articles />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
          <Route path="new-article" element={<CreateArticle />} />
          <Route path="articles/:slug/edit" element={<EditArticle />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
