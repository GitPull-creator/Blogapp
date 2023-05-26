import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../components/types/hooks';
import { fetchSoloArticle } from '../../store/articlesSlice';
import Article from '../../components/Article/Article';
import Spinner from '../../components/Spinner/Spinner';

const ArticlePage = () => {
  const articleLoading = useAppSelector((state) => state.article.articleLoading);
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(fetchSoloArticle(slug));
    }
  }, [slug]);

  return <>{articleLoading ? <Spinner /> : <Article />}</>;
};

export default ArticlePage;
