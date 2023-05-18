import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

import Article from "../Article";
import ArticlePagination from "../ArticlePagination";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";

import { fetchArticles } from "./articlesSlice";
import classes from "./ArticleList.module.scss";

function ArticleList() {
  const articles = useSelector((state) => state.articles.articles);
  const articlesLoadingStatus = useSelector((state) => state.articles.articlesLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const renderArticles = (data) => {
    const renderData = data.map((article) => <Article key={nanoid()} article={article} />);

    return articles.length === 0 ? null : renderData;
  };

  const elements = renderArticles(articles);
  const pagination = elements === null ? null : <ArticlePagination />;
  const spinner = articlesLoadingStatus !== "loading" ? null : <Spinner />;
  const error = articlesLoadingStatus !== "error" ? null : <ErrorMessage />;

  return (
    <div className={classes.ArticleList}>
      {elements}
      {spinner}
      {error}
      {pagination}
    </div>
  );
}

export default ArticleList;
