import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AssetBubbles from "../Filter/AssetBubbles";
import AssetTop from "./AssetTop";
import { BubbleProps } from "../Filter/Bubble";
import AssetsFilter, { FilterProps } from "../Filter/AssetsFilter";
import NFTCard from "./NFTCard";
import { NFTObjectData } from "../../external_api/nfts";
import { useGetNFTs } from "../../hooks/useGetNFTs";
import Translate from "../Text/Translate";
const bodyScrollLock = require("body-scroll-lock");

interface GalleryProps {
  //just append to query when calling the api
  //will be used to get user nfts, collection nfts, home nfts etc.
  hiddenQuery?: string;

  filterProps: FilterProps;
  sortQuery: string[];
  typeQuery: string[];
  initialHide?: boolean;
}

export const filterProps = (query: any) => {
  return {
    status: query.status ? query.status : [],
    collection: query.collection ? query.collection : [],
    price: {
      currencyName: query.currency ? [query.currency] : [],
      min: query.min ? [query.min] : [],
      max: query.max ? [query.max] : [],
    },
    chains: query.chains ? query.chains : [],
    category: query.category ? [query.category] : [],
    onSaleIn: query.onSaleIn ? query.onSaleIn : [],
  };
};

const Gallery: React.FC<GalleryProps> = ({
  hiddenQuery,
  filterProps,
  sortQuery,
  typeQuery,
  initialHide = false,
}) => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 900px)" });

  useEffect(() => {
    setBig(isBigScreen);
  }, [isBigScreen]);

  const [big, setBig] = useState<boolean>(false);
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(initialHide);
  const [columnClass, setColumnClass] = useState<"small" | "large">("large");

  const [bubbles, setBubbles] = useState<BubbleProps[]>([]);

  const disableBodyScroll = bodyScrollLock.disableBodyScroll;
  const enableBodyScroll = bodyScrollLock.enableBodyScroll;

  const [isOnScreen, setIsOnScreen] = useState<boolean>(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [nfts, setNfts] = useState<NFTObjectData[] | undefined>([]);

  let freshNfts = useGetNFTs({ limit: 12 });

  useEffect(() => {
    setNfts(freshNfts);
  }, [freshNfts]);

  //do this when filter menu is toggled on mobile
  const toggleShow = () => {
    if (showMobileFilter) {
      setShowMobileFilter(false);
      setHide(true);
      enableBodyScroll(document.body);
    } else {
      setShowMobileFilter(true);
      setHide(false);
      disableBodyScroll(document.body);
    }
  };

  //set event listener to show filter button when the user is looking at the gallery
  useEffect(() => {
    //get roughly the middle of the gallery to compare with page position
    const galleryPos =
      galleryRef.current &&
      galleryRef.current.offsetHeight - galleryRef.current.offsetTop;
    window.addEventListener("scroll", (e) => {
      const pos = window.scrollY;
      if (galleryPos && galleryPos < pos) setIsOnScreen(true);
      else setIsOnScreen(false);
    });
  }, [galleryRef]);

  return (
    <div className="is-flex" ref={galleryRef}>
      <div className={clsx(big && ["panel-wrapper", hide ? "hide" : "show"])}>
        <div
          className={clsx(
            big ? ["panel left", hide && "hide"] : "mobile-menu left",
            showMobileFilter ? "active" : "passive"
          )}
        >
          <AssetsFilter
            bigScreen={big}
            toggleShow={toggleShow}
            hide={hide}
            setHide={setHide}
            filterProps={filterProps}
            setBubbles={setBubbles}
          />
        </div>
      </div>

      <div className="pt-6 is-flex-grow-1 grid-wrapper px-5">
        <AssetTop
          resultCount={nfts ? nfts.length : 0}
          sortQuery={sortQuery}
          typeQuery={typeQuery}
          colummClass={columnClass}
          setColumnClass={setColumnClass}
          big={big}
        />

        {bubbles.length > 0 && <AssetBubbles bubbles={bubbles} />}
        {!nfts?.length && (
          <div className="is-flex is-justify-content-center is-align-items-center">
            <h1 className="title">No content found</h1>
          </div>
        )}
        <div className="columns is-multiline is-mobile">
          {nfts?.map((nft, i) => (
            <div
              className={clsx(
                columnClass == "small"
                  ? "column"
                  : "column is-3-fullhd is-4-widescreen is-6-half-desktop is-6-tablet is-12-mobile"
              )}
              key={i}
            >
              <NFTCard
                name={nft.name}
                owner={nft.owner}
                price={nft.price}
                collection={nft.collection}
                tokenId={nft.token_id}
                image={nft.image_uri}
                status={nft.status}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>

      {/* filter button */}
      {!big && !showMobileFilter && isOnScreen && (
        <div style={{ textAlign: "center" }}>
          <button
            className="button is-large is-link fixed-button pb-6"
            onClick={toggleShow}
          >
            <Translate keyword="filter" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
