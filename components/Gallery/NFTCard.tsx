import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";
import { Collection } from "../../external_api/nfts";
import { WalletData } from "../../external_api/wallet";
import { useEffect, useState } from "react";
import loader from "../../public/loading2.gif";
import Skeleton from "react-loading-skeleton";
import ImageLoader from "../Image/ImageLoader";

enum Status {
  "PASSIVE",
  "ON_SALE",
  "ON_TIMED_AUCTION",
  "OPEN_OFFERS",
}
export interface NFTCardProps {
  tokenId?: string;
  name?: string;
  collection?: Collection;
  owner?: WalletData;
  price?: string;
  status?: number;
  inst_buy_price?: string;
  minBidPrice?: string;
  image?: string;
  index: number;
}

const NFTCard: React.FC<NFTCardProps> = ({
  collection,
  tokenId,
  name,
  owner,
  price,
  image,
  index,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="card">
      <div className="card-header pt-1 pb-1">
        <div className="card-content pt-3 pb-3">
          <a className="title is-6 has-text-link">{owner?.address}</a>
          <p className="title is-4 mb-0">
            {/* {collection?.collection_name ? collection.collection_name : ""} */}
            {/* <Skeleton /> */}
          </p>
        </div>
      </div>
      <div className="card-image is-clickable">
        <Link href="/assets/1/2/3" passHref>
          <ImageLoader
            image={{
              src: image ? image : "https://via.placeholder.com/400x400",
              alt: "NFT Image",
              layout: "fill",
              objectFit: "contain",
            }}
            containerClass="is-1by1"
            callback={() => setLoading(false)}
          />
        </Link>
      </div>
      <div className="card-content pt-3 pb-3">
        <div className="columns is-mobile">
          <div className="column">
            <div>
              <p>{name}</p>
            </div>
            {/*             <button className="button is-black mt-3">BUY</button>
           </div>
          {/* <div className="column has-text-right">
            <div>
              <p>Price</p>
            </div>
            <div className="is-flex is-justify-content-flex-end mt-4">
              <FontAwesomeIcon
                icon={faLink}
                color="purple"
                width={16}
                className="mr-1 my-auto"
              />
              <p>{price}</p> 
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
