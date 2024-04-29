import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../services/authService";
import { baseURL } from "./AxiosUtils";

class AxiosJWTConfig {
	public static getJWTInstance(
		accessToken: string,
		setToken: (newToken: string) => void
	): AxiosInstance {
		const JWTInstance = axios.create({
			baseURL: baseURL,
			headers: {
				"Content-Type": "application/json",
			},
		});

		JWTInstance.interceptors.request.use(
			async (config: InternalAxiosRequestConfig) => {
				const decodedToken: { exp: number } = jwtDecode(accessToken);

				if (decodedToken.exp < new Date().getTime() / 1000) {
					const refreshedToken = await refreshToken();
					setToken(refreshedToken);

					config.headers["authorization"] = `Bearer ${refreshedToken}`;
				}
				return config;
			}
		);

		return JWTInstance;
	}
}

export default AxiosJWTConfig;
