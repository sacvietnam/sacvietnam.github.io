import { IProduct } from "../models/DataModel";
import AxiosConfig from "../util/AxiosUtils";

const axios = AxiosConfig.getAxiosInstance();

// READ: Lấy thông tin của tất cả người dùng
const getAllProducts = async (): Promise<IProduct[]> => {
	const result = axios.get("/products");
	return (await result).data.allProducts;
};

// READ: Lấy thông tin của một người dùng theo ID
const getProductById = async (id: string): Promise<IProduct> => {
	return (await axios.get(`/products/${id}`)).data.product;
};

export { getAllProducts, getProductById };
