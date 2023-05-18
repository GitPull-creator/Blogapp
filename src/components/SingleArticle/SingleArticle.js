import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tag } from "antd";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import logo from "../../resources/images/logo.svg";
import classes from "../Article/Article.module.scss";

import { fetchArticle } from "./articleSlice";

function SingleArticle() {
  const [hasErrorOnImageLoaded, setHasErrorOnImageLoaded] = useState(false);
  const { slug } = useParams();
  const article = useSelector((state) => state.article.article);
  const articleLoadingStatus = useSelector((state) => state.article.articleLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, []);

  const isEmpty = JSON.stringify(article) === "{}";
  const elements = isEmpty ? null : (
    <View
      article={article}
      hasErrorOnImageLoaded={hasErrorOnImageLoaded}
      setHasErrorOnImageLoaded={setHasErrorOnImageLoaded}
    />
  );
  const spinner = articleLoadingStatus !== "loading" ? null : <Spinner />;
  const error = articleLoadingStatus !== "error" ? null : <ErrorMessage />;

  return (
    <div>
      {elements}
      {spinner}
      {error}
    </div>
  );
}

function View({ article, hasErrorOnImageLoaded, setHasErrorOnImageLoaded }) {
  const { username, title, likesCount, description, text, imagePath, updatedDate } = article;

  // console.log(text);
  // slug, tags, description

  return (
    <div className={[`${classes.Article} ${classes["Article--single"]}`]}>
      <header className={classes.Article__header}>
        <div className={classes.Title}>
          <div className={classes.Title__wrapper}>
            <h2 className={classes.Title__link}>{title}</h2>
            <HeartOutlined />
            <p className={classes.Title__count}>{likesCount}</p>
          </div>
          <Tag>Tag1</Tag>
          <p className={classes.Article__description}>{description}</p>
        </div>
        <div className={classes["User-info"]}>
          <div className={classes["User-info__wrapper"]}>
            <h3>{username}</h3>
            <p className={classes["User-info__data"]}>${updatedDate}</p>
          </div>
        </div>
        <img
          className={classes.Logo}
          src={hasErrorOnImageLoaded ? logo : imagePath}
          onError={() => setHasErrorOnImageLoaded(true)}
          alt="Logo"
        />
      </header>
      <div className={[`${classes.Article__content} ${classes["Article__content--single"]}`]}>
        <ReactMarkdown className={classes.Article__markdown} remarkPlugins={[remarkGfm]}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// children={text}

export default SingleArticle;
