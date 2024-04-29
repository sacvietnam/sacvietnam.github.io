import { IProduct } from "../models/DataModel";
import AxiosConfig from "../util/AxiosUtils";

const axios = AxiosConfig.getAxiosInstance();

// READ: Lấy thông tin của tất cả người dùng
// GET /products?limit=10&page=1
const getAllProducts = async (pageSize = 5, page = 1): Promise<IProduct[]> => {
	const result = axios.get(`/products?limit=${pageSize}&page=${page}`);
	return (await result).data.allProducts;
};

// READ: Lấy thông tin của một người dùng theo ID
const getProductById = async (id: string): Promise<IProduct> => {
	return (await axios.get(`/products/${id}`)).data.product;
};

const getProductSize = async (): Promise<number> => {
	return (await axios.get("/products/size")).data.size;
};

export { getAllProducts, getProductById, getProductSize };
