import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from '../types/hooks';
import Articles from '../Articles/Articles';
import Layout from '../../pages/Layout/Layout';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';
import SignUp from '../../pages/SignUp/SignUp';
import SignIn from '../../pages/SignIn/SignIn';
import { setsIsLoggedIn } from '../../store/userSlice';
import Profile from '../Profile/Profile';
import CreateArticle from '../CreateArticle/CreateArticle';
import EditArticle from '../EditArticle/EditArticle';
import NotFound from '../../pages/NotFound/NotFound';
import {
  articlePath,
  articlesPath,
  createArticlePath,
  editArticlePath,
  layoutPath,
  notFoundPath,
  profilePath,
  signInPath,
  signUpPath,
} from '../../routes';

import classes from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setsIsLoggedIn());
    }
  }, []);

  return (
    <div className={classes.App}>
      <Routes>
        <Route path={layoutPath} element={<Layout />}>
          <Route index element={<Articles />} />
          <Route path={articlesPath} element={<Articles />} />
          <Route path={articlePath} element={<ArticlePage />} />
          <Route path={signUpPath} element={<SignUp />} />
          <Route path={signInPath} element={<SignIn />} />
          <Route path={profilePath} element={<Profile />} />
          <Route path={createArticlePath} element={<CreateArticle />} />
          <Route path={editArticlePath} element={<EditArticle />} />
          <Route path={notFoundPath} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
