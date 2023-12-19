import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../Tooltip";
import { useTranslate } from "../Text/Translate";

interface FavoriteButtonProps {
  favoriteCount: number;
  isFavorited: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  favoriteCount,
  isFavorited = false,
}) => {
  const [hasColor, setHasColor] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(isFavorited);
  const [favoritedCount, setFavoritedCount] = useState<number>(favoriteCount);

  const fav = useTranslate("favorite");
  const take = useTranslate("take_back");

  const manageLikeToggle = () => {
    if (favorited) setFavoritedCount(favoritedCount - 1);
    else setFavoritedCount(favoritedCount + 1);
    let newLiked = !favorited;
    setFavorited(newLiked);
  };
  return (
    <div>
      <Tooltip />
      <button
        className="button is-ghost px-0 py-0"
        onMouseEnter={(e) => setHasColor(true)}
        onMouseLeave={(e) => setHasColor(false)}
        onClick={(e) => manageLikeToggle()}
      >
        {favorited ? (
          <FontAwesomeIcon
            data-tip={fav}
            icon={fasHeart}
            height={16}
            className="heart"
            color={hasColor ? "grey" : "pink"}
          />
        ) : (
          <FontAwesomeIcon
            data-tip={take}
            icon={faHeart}
            height={16}
            className="heart"
            color={hasColor ? "pink" : "grey"}
          />
        )}
      </button>

      <p>{favoritedCount}</p>
    </div>
  );
};

export default FavoriteButton;
