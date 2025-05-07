import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../../services/authService";
import { baseURL } from "./AxiosUtils";
import LocalStorageHandler from "../localStorage/LocalStorageHandler";
import { UserData } from "../../contexts/GlobalContext";

class AxiosJWTConfig {
  private static JWTInstance: AxiosInstance | null = null;

  public static getJWTInstance(): AxiosInstance {
    if (!this.JWTInstance) {
      this.JWTInstance = axios.create({
        baseURL: baseURL,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      this.JWTInstance.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
          const localUserData = LocalStorageHandler.getItem<UserData>("USER");
          const localAccessToken = localUserData?.accessToken;
          if (!localAccessToken) {
            return config;
          }

          const decodedToken: { exp: number } = jwtDecode(localAccessToken);

          if (decodedToken.exp < new Date().getTime() / 1000) {
            const refreshedToken = await refreshToken();
            LocalStorageHandler.setItem("USER", {
              ...localUserData,
              accessToken: refreshedToken,
            });
            console.log("REFRESHED TOKEN", refreshedToken);
            config.headers["authorization"] = `Bearer ${refreshedToken}`;
          } else {
            config.headers["authorization"] = `Bearer ${localAccessToken}`;
          }
          return config;
        },
      );
    }

    return this.JWTInstance;
  }
}

export default AxiosJWTConfig;
