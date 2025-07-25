import "server-only";

import { Locale } from "@/i18n.config";
import { Languages } from "@/constants/enums";

const dictionaries = {
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

const getTrans = async (locale: Locale) => {
  return dictionaries[locale as Languages]?.() ?? dictionaries.en();
};

export default getTrans;
