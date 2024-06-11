import AxiosJWTConfig from "../util/axios/AxiosJWTConfig";
import AxiosConfig from "../util/axios/AxiosUtils";

const axios = AxiosConfig.getAxiosInstance();
const axiosJWT = AxiosJWTConfig.getJWTInstance();

// READ: Get information of all articles
// GET /articles?limit=10&page=1
const getAllArticles = async (pageSize = 5, page = 1): Promise<IArticle[]> => {
  const result = axios.get(`/articles?limit=${pageSize}&page=${page}`);
  return (await result).data.allArticle;
};

const getDeletedArticles = async (
  pageSize = 5,
  page = 1,
): Promise<IArticle[]> => {
  const result = axiosJWT.get(
    `/articles/deleted?limit=${pageSize}&page=${page}`,
  );
  return (await result).data.deletedArticles;
};

// READ: Get information of an article by ID
const getArticleById = async (id: string): Promise<IArticle> => {
  return (await axios.get(`/articles/${id}`)).data.article;
};

const getArticleSize = async (): Promise<number> => {
  return (await axios.get("/articles/size")).data.size;
};

const getDeletedArticleSize = async (): Promise<number> => {
  return (await axiosJWT.get("/articles/deleted/size")).data.size;
};

const softDeleteArticle = async (id: string): Promise<boolean> => {
  const response = await axiosJWT.patch(`/articles/${id}/soft-delete`);
  return response.status === 200;
};

const hardDeleteArticle = async (id: string): Promise<boolean> => {
  const response = await axiosJWT.delete(`/articles/${id}`);
  return response.status === 200;
};

const restoreDeletedArticle = async (id: string): Promise<boolean> => {
  const response = await axiosJWT.patch(`/articles/${id}/restore`);
  return response.status === 200;
};

const createArticle = async ({
  title,
  description,
  image,
  content,
}: Partial<IArticle>): Promise<IArticle> => {
  const response = await axiosJWT.post("/articles", {
    title,
    description,
    image,
    content,
    getDeletedArticles,
  });

  return response.data.article;
};

const updateArticle = async (
  { title, description, image, content }: Partial<IArticle>,
  _id: string,
): Promise<boolean> => {
  const response = await axiosJWT.patch(`/articles/${_id}`, {
    title,
    description,
    image,
    content,
  });

  return response.status === 200;
};

const increaseView = async (id: string): Promise<boolean> => {
  const response = await axios.patch(`/articles/${id}/viewed`);

  return response.status === 200;
};

export {
  getAllArticles,
  getArticleById,
  getArticleSize,
  getDeletedArticleSize,
  getDeletedArticles,
  hardDeleteArticle,
  createArticle,
  updateArticle,
  restoreDeletedArticle,
  softDeleteArticle,
  increaseView,
};
