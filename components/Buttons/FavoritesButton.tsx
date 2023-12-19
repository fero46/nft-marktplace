import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OwnerCreatorProps } from "../../utils/types";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useTranslate } from "../Text/Translate";

interface FavoritesButtonProps {
  favoriteCount: number;
  favoritedBy?: OwnerCreatorProps[]; //needs to be fetched?
}

const FavoritesButton: React.FC<FavoritesButtonProps> = ({
  favoriteCount,
  favoritedBy,
}) => {
  const fav = useTranslate("favorite");
  const favs = useTranslate("favorites");
  return (
    <button className="button new-ghost">
      <FontAwesomeIcon icon={faHeart} className="my-auto mr-1" />
      {favoriteCount > 1 ? (
        <p>
          {favoriteCount} {favs}
        </p>
      ) : (
        <p>
          {favoriteCount} {fav}
        </p>
      )}
    </button>
  );
};

export default FavoritesButton;
