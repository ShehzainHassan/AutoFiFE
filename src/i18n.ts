import { I18n } from "i18n-js";
import { useMemo } from "react";
import en from "../locales/en.json";
const i18n = new I18n({
  en,
});

i18n.locale = "en";
i18n.enableFallback = true;

const useTranslation = () => {
  const t = useMemo(() => i18n.t.bind(i18n), []);
  return { t };
};

export default useTranslation;
