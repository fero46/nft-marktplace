import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Collapsible from "../Buttons/Collapsible";
import PriceFilter from "./PriceFilter";
import StatusFilter from "./StatusFilter";
import ChainsFilter from "./ChainsFilter";
import CategoriesFilter from "./CategoriesFilter";
import CollectionFilter from "./CollectionsFilter";
import OnSaleInFilter from "./OnSaleInFilter";
import { all } from "../../utils/collectionsTemplate";
import { CollectionProps } from "../../utils/types";
import { partition } from "../../hooks/helperFunctions";
import { useRouter } from "next/router";
import { faFilter, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BubbleProps } from "./Bubble";
import Translate from "../Text/Translate";
import clsx from "clsx";

interface AssetsFilterProps {
  bigScreen: boolean;
  toggleShow: () => void;
  hide: boolean;
  setHide: Dispatch<SetStateAction<boolean>>;
  filterProps: FilterProps;
  setBubbles: Dispatch<SetStateAction<BubbleProps[]>>;
}
export interface PriceQueryProps {
  currencyName: string[];
  min: string[];
  max: string[];
}
export interface FilterProps {
  status: string[];
  price: PriceQueryProps;
  collection: string[];
  chains: string[];
  category: string[];
  onSaleIn: string[];
}

const emptyPrice: PriceQueryProps = {
  currencyName: [],
  min: [],
  max: [],
};

const AssetsFilter: React.FC<AssetsFilterProps> = ({
  bigScreen,
  toggleShow,
  hide,
  setHide,
  filterProps,
  setBubbles,
}) => {
  const router = useRouter();

  const [status, setStatus] = useState<string[]>(filterProps.status);
  const [price, setPrice] = useState<PriceQueryProps>(filterProps.price);
  const [fetchedCollections, setFetchedCollections] =
    useState<CollectionProps[]>();
  const [selectedCollections, setSelectedCollections] =
    useState<CollectionProps[]>();
  const [collectionQuery, setCollectionQuery] = useState<string[]>(
    filterProps.collection
  );
  const [chains, setChains] = useState<string[]>(filterProps.chains);
  const [category, setCategory] = useState<string[]>(filterProps.category);
  const [onSaleIn, setOnSaleIn] = useState<string[]>(filterProps.onSaleIn);
  useEffect(() => {
    //will be fetched from api,
    //needs to be fetched before CollectionFilter mount
    const [selectedTemp, fetchedTemp]: [CollectionProps[], CollectionProps[]] =
      partition(all, (e: CollectionProps) => collectionQuery.includes(e.name));
    setFetchedCollections(fetchedTemp);
    setSelectedCollections(selectedTemp);
    setBubbles((prev) => {
      let otherBubbles: BubbleProps[] = prev.filter(
        (p) => p.tag !== "collections"
      );
      if (selectedTemp) {
        let b: BubbleProps[] = selectedTemp.map((c) => {
          return {
            title: c.name,
            imageSrc: c.imageSrc,
            tag: "collections",
            filterSetter: () => {
              setCollectionQuery((prev) => prev.filter((p) => p != c.name));
            },
          };
        });
        return [...otherBubbles, ...b];
      } else return [...otherBubbles];
    });
  }, [collectionQuery]);

  //all query states should be sent as string or empty arrays
  useEffect(() => {
    router.replace(
      {
        query: {
          ...router.query,
          status: status,
          currency: price && price.currencyName,
          min: price && price.min,
          max: price && price.max,
          collection: collectionQuery,
          chains: chains,
          category: category,
          onSaleIn: onSaleIn,
        },
      },
      undefined,
      { scroll: false }
    );
  }, [status, price, collectionQuery, chains, category, onSaleIn]);

  const clearQuery = () => {
    setStatus([]);
    setPrice(emptyPrice);
    setCollectionQuery([]);
    setFetchedCollections([]);
    setCategory([]);
    setOnSaleIn([]);
  };

  const handleHide = () => {
    setHide((prev) => (prev = !prev));
  };

  return (
    <>
      {bigScreen ? (
        <button
          className={clsx(
            "button is-medium is-fullwidth is-radiusless is-flex",
            hide
              ? "is-justify-content-flex-end"
              : "is-justify-content-space-between"
          )}
          onClick={handleHide}
        >
          {!hide && (
            <div>
              <FontAwesomeIcon icon={faFilter} className="mr-3 my-auto" />
              <Translate keyword="filter" />
            </div>
          )}
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={clsx("flip", hide && "active")}
          />
        </button>
      ) : (
        <div
          className="is-flex is-justify-content-space-between"
          style={{ height: "fit-content" }}
        >
          <button className="button is-medium new-ghost" onClick={clearQuery}>
            <Translate keyword="clear_all" />
          </button>
          <button className="button is-medium new-ghost" onClick={toggleShow}>
            <Translate keyword="done" />
          </button>
        </div>
      )}

      <div className={clsx(hide && "invisible")}>
        <Collapsible translate title="status" initiallyOpen={true}>
          <StatusFilter
            getter={status}
            setter={setStatus}
            setBubbles={setBubbles}
          />
        </Collapsible>
        <Collapsible translate title="price" initiallyOpen={true}>
          <PriceFilter
            getter={price}
            setter={setPrice}
            setBubbles={setBubbles}
          />
        </Collapsible>
        <Collapsible translate title="collections">
          {fetchedCollections && selectedCollections && (
            <CollectionFilter
              initialCollections={fetchedCollections}
              selectedCollections={selectedCollections}
              setter={setCollectionQuery}
            />
          )}
        </Collapsible>
        <Collapsible
          translate
          title="chains"
          initiallyOpen={filterProps.chains.length > 0}
        >
          <ChainsFilter
            getter={chains}
            setter={setChains}
            setBubbles={setBubbles}
          />
        </Collapsible>
        <Collapsible
          translate
          title="categories"
          initiallyOpen={filterProps.category.length > 0}
        >
          <CategoriesFilter
            getter={category}
            setter={setCategory}
            setBubbles={setBubbles}
          />
        </Collapsible>
        <Collapsible
          translate
          title="on_sale_in"
          initiallyOpen={filterProps.onSaleIn.length > 0}
        >
          <OnSaleInFilter
            getter={onSaleIn}
            setter={setOnSaleIn}
            setBubbles={setBubbles}
          />
        </Collapsible>
      </div>
    </>
  );
};

export default AssetsFilter;
