import { useSelector } from "react-redux";
import { useAppSelector } from "../../hooks/reduxHooks";

interface TranslateProps {
  keyword: string;
  returnKeyword?: boolean;
}

export const useTranslate = (keyword: string) => {
  const file = useAppSelector((state) => state.language.value);
  return file && file.get(keyword);
};

const Translate: React.FC<TranslateProps> = ({ keyword, returnKeyword }) => {
  return <>{useTranslate(keyword)}</>;
};

export default Translate;
