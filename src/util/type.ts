import { IconType } from "react-icons";
import { ContentMultiLang } from "../hooks/useLang";

export type FeatureObject = {
	name: string;
	description: ContentMultiLang;
	Icon: IconType;
};
