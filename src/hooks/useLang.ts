import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type Language = "en" | "vi";

export type ContentMultiLang = {
	[key in Language]: string;
};

export type AnyMultiLang = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key in Language]: any;
};

const STORAGE_KEY = "SAC_LANGUAGE";

const useLang = () => {
	const [currentLang, setCurrentLang] = useState<Language>(() => {
		const localRaw = window.localStorage.getItem(STORAGE_KEY);

		if (localRaw) {
			const lang: Language = (JSON.parse(localRaw) as Language) || "en";

			return lang;
		}

		return "en";
	});

	useEffect(() => {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentLang));
	}, [currentLang]);

	const getContentCurrentLang = (content: ContentMultiLang) => {
		return content[currentLang] || "ERROR";
	};

	const getAnyCurrentLang = (anyItem: AnyMultiLang) => {
		return anyItem[currentLang] || "ERROR";
	};

	return {
		control: [currentLang, setCurrentLang] as [
			Language,
			Dispatch<SetStateAction<Language>>
		],
		getContentCurrentLang,
		getAnyCurrentLang,
	};
};

export default useLang;
