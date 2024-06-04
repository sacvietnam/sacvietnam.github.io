import AxiosJWTConfig from "../util/axios/AxiosJWTConfig";
import { baseURL } from "../util/axios/AxiosUtils";

const axios = AxiosJWTConfig.getJWTInstance();

const uploadFileToTemp = async (
  file: File,
  type: "article" | "product",
): Promise<string> => {
  const formData = new FormData();
  formData.append(type, file);

  const result = await axios.post(`/files/${type}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return baseURL + "/" + result.data.path;
};

const uploadFileToOwner = async (
  file: File,
  owner_id: string,
  type: "article" | "product",
): Promise<string> => {
  const formData = new FormData();
  formData.append(type, file);
  formData.append("owner_id", owner_id);
  formData.append("type", type);

  const result = await axios.patch(`/files/${type}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return baseURL + "/" + result.data.path;
};

export { uploadFileToTemp, uploadFileToOwner };
