import React, { Dispatch, createContext, useState } from "react";
import LocalStorageHandler from "../util/localStorage/LocalStorageHandler";

export interface UserData {
	_id: string;
	username: string;
	phone: string;
	gender: string;
	name: string;
	role: "admin" | "user";
	accessToken: string;
}

type GlobalContextType = {
	user: UserData | null;
	setUser: Dispatch<React.SetStateAction<UserData | null>>;
	accessToken: string;
	setAccessToken: (newToken: string) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
	user: null,
	setUser: () => {
		console.log("Undefined user");
	},
	accessToken: "",
	setAccessToken: () => {
		console.log("Undefined accessToken");
	},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserData | null>(() => {
		const userLogged = LocalStorageHandler.getItem<UserData>("USER");
		return userLogged;
	});

	const setAccessToken = (newToken: string) => {
		setUser((prev) => {
			if (prev) {
				return { ...prev, accessToken: newToken };
			}
			return prev;
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				user,
				setUser,
				accessToken: user?.accessToken || "",
				setAccessToken,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
