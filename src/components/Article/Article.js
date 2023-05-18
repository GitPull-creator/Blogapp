import { useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import HeartOutlined from "@ant-design/icons/HeartOutlined";

import logo from "../../resources/images/logo.svg";

import classes from "./Article.module.scss";

function Article({ article }) {
  const [hasErrorOnImageLoaded, setHasErrorOnImageLoaded] = useState(false);
  const { slug, username, title, likesCount, description, imagePath, updatedDate } = article;

  // tags, description,

  return (
    <div className={classes.Article}>
      <header className={classes.Article__header}>
        <div className={classes.Title}>
          <div className={classes.Title__wrapper}>
            <Link to={`/articles/${slug}`} className={classes.Title__link}>
              {title}
            </Link>
            <HeartOutlined />
            <p className={classes.Title__count}>{likesCount}</p>
          </div>
          <Tag>Tag1</Tag>
        </div>
        <div className={classes["User-info"]}>
          <div className={classes["User-info__wrapper"]}>
            <h3>{username}</h3>
            <p className={classes["User-info__data"]}>{updatedDate}</p>
          </div>
        </div>
        <img
          className={classes.Logo}
          src={hasErrorOnImageLoaded ? logo : imagePath}
          onError={() => setHasErrorOnImageLoaded(true)}
          alt="Logo"
        />
      </header>
      <div className={classes.Article__content}>
        <p className={classes.Article__text}>{description}</p>
      </div>
    </div>
  );
}

export default Article;

// // tagList, createdAt,

// console.log(image);
// const logo =

// img.onerror = function () {
//   alert("Ошибка во время загрузки изображения");
// };

// const onError = () => {
//   console.log(this);
//   console.log("Ошибочка");
// };
