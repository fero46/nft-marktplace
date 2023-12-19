import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Favorite from "../Buttons/FavoriteButton";
import ImageLoader from "../Image/ImageLoader";
import Modal from "../Modal";

interface AssetCardProps {
  favoriteCount: number;
  isFavorited?: boolean;
}

const AssetCard: React.FC<AssetCardProps> = ({
  favoriteCount,
  isFavorited = false,
}) => {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div className="card asset-card mb-3">
        <div className="card-header has-text-right has-text-grey pt-1 pb-1 pr-3 pl-3 d-flex is-justify-content-space-between">
          <div>{/* this can be filled */}</div>
          <Favorite favoriteCount={favoriteCount} isFavorited={isFavorited} />
        </div>
        <div
          className="card-image is-clickable"
          onClick={() => setModalShow(true)}
        >
          <ImageLoader
            image={{
              src: "https://via.placeholder.com/1500x1500",
              alt: "Placeholder Image",
              layout: "fill",
              objectFit: "contain",
              priority: true,
            }}
            containerClass="is-1by1"
          />
        </div>
      </div>
      <Modal show={modalShow} setShow={setModalShow} image>
        <figure className="image">
          <img
            src="https://via.placeholder.com/1920x1080"
            alt="Placeholder Image"
            // layout="fill"
            // objectFit="none"
            className="is-fullwidth is-block"
          />
        </figure>
      </Modal>
    </>
  );
};

export default AssetCard;
