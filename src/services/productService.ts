import AxiosJWTConfig from "../util/axios/AxiosJWTConfig";
import AxiosConfig from "../util/axios/AxiosUtils";

const axios = AxiosConfig.getAxiosInstance();
const axiosJWT = AxiosJWTConfig.getJWTInstance();

// READ: Lấy thông tin của tất cả người dùng
// GET /products?limit=10&page=1
const getAllProducts = async (pageSize = 5, page = 1): Promise<IProduct[]> => {
  const response = await axios.get(`/products?limit=${pageSize}&page=${page}`);
  return response.data.allProducts;
};

// READ: Lấy thông tin của một người dùng theo ID
const getProductById = async (id: string): Promise<IProduct> => {
  return (await axios.get(`/products/${id}`)).data.product;
};

const getProductSize = async (): Promise<number> => {
  return (await axios.get("/products/size")).data.size;
};
const createProduct = async ({
  name,
  images,
  price,
  discount,
  description,
}: Partial<IProduct>): Promise<IProduct> => {
  const response = await axiosJWT.post("/products", {
    name,
    images,
    price,
    discount,
    description,
  });

  return response.data.product;
};

export { getAllProducts, getProductById, getProductSize, createProduct };
