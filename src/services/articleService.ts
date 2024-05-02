import { IArticle } from "../models/DataModel";
import AxiosConfig from "../util/axios/AxiosUtils";

const axios = AxiosConfig.getAxiosInstance();

// READ: Get information of all articles
// GET /articles?limit=10&page=1
const getAllArticles = async (pageSize = 5, page = 1): Promise<IArticle[]> => {
	const result = axios.get(`/articles?limit=${pageSize}&page=${page}`);
	return (await result).data.allArticle;
};

// READ: Get information of an article by ID
const getArticleById = async (id: string): Promise<IArticle> => {
	return (await axios.get(`/articles/${id}`)).data.article;
};

const getArticleSize = async (): Promise<number> => {
	return (await axios.get("/articles/size")).data.size;
};

export { getAllArticles, getArticleById, getArticleSize };
