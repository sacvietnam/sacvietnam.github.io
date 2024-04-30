import axios, { AxiosInstance } from "axios";

export const baseURL = import.meta.env.DEV
	? "http://localhost:3000"
	: "https://api.example.com";

// Singleton class to create axios instance
class AxiosConfig {
	private static instance: AxiosInstance;

	constructor() {
		throw new Error("Cannot create an instance of this class");
	}

	public static getAxiosInstance(): AxiosInstance {
		if (!this.instance) {
			this.instance = axios.create({
				baseURL: baseURL,
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
		}

		return this.instance;
	}
}

export default AxiosConfig;
