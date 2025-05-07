import { UserData } from "../contexts/GlobalContext";
import AxiosConfig from "../util/axios/AxiosUtils";
import LocalStorageHandler from "../util/localStorage/LocalStorageHandler";

const axios = AxiosConfig.getAxiosInstance();

const register = async (values: Partial<IAccount>): Promise<IAccount> => {
  if (!values.phone || !values.password || !values.name || !values.email) {
    throw new Error("Please fill all required fields");
  }

  const result = await axios.post("/auth/register", values);

  if (result.status === 400) {
    if (result.data.message === "Phone number already exist") {
      throw new Error("Phone number is already taken");
    }
    if (result.data.message === "Email already exist") {
      throw new Error("Email is already taken");
    }
  }

  if (result.status === 500) {
    throw new Error("Error occurred while registering");
  }

  return result.data.user;
};

const login = async (
  {
    username,
    password,
  }: {
    username: string;
    password: string;
  },
  dispatch: React.Dispatch<React.SetStateAction<UserData | null>>,
): Promise<UserData | null> => {
  const result = await axios.post("/auth/login", { username, password });

  if (result.status === 401) {
    throw new Error("Username or password is incorrect");
  }

  if (result.status === 200) {
    const user = (await result).data.data;
    dispatch(user);
    LocalStorageHandler.setItem("USER", user);
    return user;
  }

  return null;
};

const refreshToken = async (): Promise<string> => {
  const result = await axios.post("/auth/refresh");
  console.log(result);
  return (await result).data.data.accessToken;
};

const logout = async (
  dispatch: React.Dispatch<React.SetStateAction<UserData | null>>,
): Promise<boolean> => {
  const result = axios.post("/auth/logout");
  dispatch(null);
  LocalStorageHandler.setItem("USER", null);
  return (await result).status === 200;
};

export { register, login, logout, refreshToken };
