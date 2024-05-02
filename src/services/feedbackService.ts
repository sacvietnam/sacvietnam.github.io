import { IFeedback } from "../models/DataModel";
import AxiosJWTConfig from "../util/axios/AxiosJWTConfig";
import AxiosConfig from "../util/axios/AxiosUtils";

const axios = AxiosConfig.getAxiosInstance();
const jwtAxios = AxiosJWTConfig.getJWTInstance();

// READ: Lấy thông tin của một người dùng theo ID
const getFeedbackByProductId = async (
	product_id: string,
	pageSize = 5,
	page = 1
): Promise<IFeedback[]> => {
	return (
		await axios.get(
			`/feedbacks/products/${product_id}?limit=${pageSize}&page=${page}`
		)
	).data.feedbacks;
};

const getFeedbackSizeByProductId = async (
	product_id: string
): Promise<number> => {
	return (await axios.get(`/feedbacks/products/${product_id}/size`)).data.size;
};

const addFeedback = async (feedback: Partial<IFeedback>): Promise<boolean> => {
	try {
		const result = await jwtAxios.post(`/feedbacks/`, feedback);
		console.log("ADDFEDDBACK REUSLT", result);
		return true;
	} catch (err) {
		return false;
	}
};

export { getFeedbackByProductId, addFeedback, getFeedbackSizeByProductId };
