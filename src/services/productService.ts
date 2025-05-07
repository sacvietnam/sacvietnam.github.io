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
  inventory,
}: Partial<IProduct>): Promise<IProduct> => {
  const response = await axiosJWT.post("/products", {
    name,
    images,
    price,
    discount,
    description,
    inventory,
  });

  return response.data.product;
};

const getDeletedProductSize = async (): Promise<number> => {
  return (await axiosJWT.get("/products/deleted/size")).data.size;
};

const softDeleteProduct = async (id: string): Promise<boolean> => {
  const response = await axiosJWT.patch(`/products/${id}/soft-delete`);
  return response.status === 200;
};

const hardDeleteProduct = async (id: string): Promise<boolean> => {
  const response = await axiosJWT.delete(`/products/${id}`);
  return response.status === 200;
};

const restoreDeletedProduct = async (id: string): Promise<boolean> => {
  const response = await axiosJWT.patch(`/products/${id}/restore`);
  return response.status === 200;
};

const getDeletedProducts = async (
  pageSize = 5,
  page = 1,
): Promise<IProduct[]> => {
  const result = axiosJWT.get(
    `/products/deleted?limit=${pageSize}&page=${page}`,
  );
  return (await result).data.deletedProducts;
};

const updateProduct = async (
  { name, images, price, discount, description, inventory }: Partial<IProduct>,
  _id: string,
): Promise<boolean> => {
  const response = await axiosJWT.patch(`/products/${_id}`, {
    name,
    images,
    price,
    discount,
    description,
    inventory,
  });

  return response.status === 200;
};

export {
  getAllProducts,
  getProductById,
  getProductSize,
  createProduct,
  getDeletedProductSize,
  softDeleteProduct,
  hardDeleteProduct,
  restoreDeletedProduct,
  getDeletedProducts,
  updateProduct,
};
