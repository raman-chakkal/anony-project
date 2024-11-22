import API from '../api/api';

export const fetchArticles = async () => {
  const { data } = await API.get('/articles');
  return data;
};

export const fetchArticleById = async (id) => {
  const { data } = await API.get(`/articles/${id}`);
  return data;
};

export const createArticle = async (articleData) => {
  const { data } = await API.post('/articles', articleData);
  return data;
};
