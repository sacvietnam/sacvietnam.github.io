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
  const result = axios.get(`/articles/deleted?limit=${pageSize}&page=${page}`);
  return (await result).data.allArticle;
};

// READ: Get information of an article by ID
const getArticleById = async (id: string): Promise<IArticle> => {
  return (await axios.get(`/articles/${id}`)).data.article;
};

const getArticleSize = async (): Promise<number> => {
  return (await axios.get("/articles/size")).data.size;
};

const softDeleteArticle = async (id: string): Promise<boolean> => {
  const response = await axiosJWT.patch(`/articles/${id}/soft-delete`);
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

export {
  getAllArticles,
  getArticleById,
  getArticleSize,
  getDeletedArticles,
  createArticle,
  softDeleteArticle,
};
