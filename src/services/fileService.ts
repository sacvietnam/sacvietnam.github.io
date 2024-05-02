import AxiosJWTConfig from "../util/axios/AxiosJWTConfig";

const axios = AxiosJWTConfig.getJWTInstance();

const uploadFile = async (
	file: File,
	owner_id: string,
	type: "article" | "product"
): Promise<string> => {
	const formData = new FormData();
	formData.append(type, file);

	const result = await axios.post(
		`/files/article/${owner_id}/${type}`,
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);
	return result.data.path;
};

export { uploadFile };
