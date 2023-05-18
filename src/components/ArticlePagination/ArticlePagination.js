import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { fetchArticles } from "../ArticleList/articlesSlice";

function ArticlePagination() {
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const dispatch = useDispatch();

  const onChangePage = (page) => {
    dispatch(fetchArticles(page));
  };

  return (
    <Pagination
      currentPage={1}
      defaultPageSize={5}
      total={articlesCount}
      showSizeChanger={false}
      onChange={(event) => onChangePage(event)}
    />
  );
}

export default ArticlePagination;
