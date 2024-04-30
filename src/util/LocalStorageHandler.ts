/* eslint-disable @typescript-eslint/no-explicit-any */
const LOCAL_STORAGE_KEY = {
	USER: "user",
	LOGIN_FORM: "loginForm",
	ACCESS_TOKEN: "accessToken",
};

type LOCAL_STORAGE_KEY_TYPE = { [key in keyof typeof LOCAL_STORAGE_KEY]: any };

class LocalStorageHandler {
	private static MAIN_KEY = "SmartAirconClothing";
	private static object: LOCAL_STORAGE_KEY_TYPE = {
		USER: null,
		LOGIN_FORM: null,
		ACCESS_TOKEN: null,
	};

	public static initial() {
		const raw = localStorage.getItem(LocalStorageHandler.MAIN_KEY) || null;
		if (raw) {
			this.object = JSON.parse(raw);
		}
	}

	public static setItem(key: keyof typeof LOCAL_STORAGE_KEY, value: any) {
		this.object[key] = value;

		localStorage.setItem(this.MAIN_KEY, JSON.stringify(this.object));
	}

	public static getItem<T>(key: keyof typeof LOCAL_STORAGE_KEY): T | null {
		return this.object[key] as T;
	}
}

export default LocalStorageHandler;
