import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../types/hooks';
import { fetchArticles } from '../../store/articlesSlice';
import ShortArticle from '../ShortArticle/ShortArticle';
import Spinner from '../Spinner/Spinner';
import { ArticleType } from '../types/types';

import classes from './Articles.module.scss';

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPage = Number(searchParams.get('page')) || 1;

  const articlesData = useAppSelector((state) => state.article.articlesData);
  const loading: boolean = useAppSelector((state) => state.article.loading);
  const total: number = useAppSelector((state) => state.article.total);
  const token = useAppSelector((state) => state.user.user.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchParams({ page: searchPage.toString() || '1' });
    const offset = searchPage ? searchPage * 5 - 5 : 1;
    dispatch(fetchArticles({ offset, token }));
  }, [searchPage]);

  const handlePaginationChange = (page: string) => {
    setSearchParams({ page: page });
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      <ul className={classes.list}>
        {articlesData.map((item: ArticleType, index: number) => (
          <li key={index}>
            <ShortArticle article={item} />
          </li>
        ))}
      </ul>

      <Pagination
        total={total}
        style={{ textAlign: 'center', marginBottom: '15px' }}
        pageSize={5}
        showSizeChanger={false}
        onChange={(page) => handlePaginationChange(String(page))}
        current={searchPage}
      />
    </>
  );
};

export default Articles;
