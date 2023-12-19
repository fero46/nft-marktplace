interface LanguageProps {
  locale: string;
  fileName: string;
  nativeName: string;
}

export interface LanguageDataProps {
  k: string;
  v: string;
}

const english: LanguageProps = {
  locale: "en-US",
  fileName: "eng",
  nativeName: "English",
};

const supported = [english];

export default supported;
