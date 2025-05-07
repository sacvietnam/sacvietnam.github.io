import { IconType } from "react-icons";
import { MultilangContent } from "../contexts/LangContext";

export type FeatureObject = {
  name: MultilangContent;
  description: MultilangContent;
  Icon: IconType;
};
