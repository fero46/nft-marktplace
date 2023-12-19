import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import DisplayAddons from "./DisplayAddons";
import FullwidthDropdown, {
  FullwidthDropdownProps,
  ButtonProps,
} from "../Buttons/FullwidthDropdown";
import Translate from "../Text/Translate";

interface AssetTopProps {
  resultCount: number;
  typeQuery: string[]; //bunların getter ve setterları olcak
  sortQuery: string[];
  colummClass: "small" | "large";
  setColumnClass: Dispatch<SetStateAction<"small" | "large">>;
  big: boolean;
}

const typeList: ButtonProps[] = [
  {
    title: "All Items",
    data: undefined,
  },
  {
    title: "Single Items",
    data: "single",
  },
  {
    title: "Bundles",
    data: "bundle",
  },
];

const sortList: ButtonProps[] = [
  {
    title: "Recently Listed",
    data: "a",
  },
  {
    title: "Recently Received",
    data: "b",
  },
  {
    title: "Recently Created",
    data: "c",
  },
  {
    title: "Recently Sold",
    data: "d",
  },
  {
    title: "Ending Soon",
    data: "e",
  },
  {
    title: "Price: Low to High",
    data: "f",
  },
  {
    title: "Price: High to Low",
    data: "g",
  },
  {
    title: "Highest Last Sale",
    data: "h",
  },
  {
    title: "Oldest",
    data: "j",
  },
];

const AssetTop: React.FC<AssetTopProps> = ({
  resultCount,
  typeQuery,
  sortQuery,
  colummClass,
  setColumnClass,
  big,
}) => {
  const [typeFilter, setTypeFilter] = useState<string[]>(typeQuery);
  const [sortFilter, setSortFilter] = useState<string[]>(sortQuery);

  const [typeButtons, setTypeButtons] = useState<FullwidthDropdownProps>();
  const [sortButtons, setSortButtons] = useState<FullwidthDropdownProps>();

  const router = useRouter();

  useEffect(() => {
    router.replace(
      {
        query: {
          ...router.query,
          type: typeFilter ? typeFilter : [],
          sort: sortFilter ? sortFilter : [],
        },
      },
      undefined,
      { scroll: false }
    );
  }, [typeFilter, sortFilter]);

  useEffect(() => {
    let selectedType = typeList.find((l) => l.data == typeFilter);
    setTypeButtons({
      selected: selectedType ? selectedType : typeList[0],
      list: typeList,
      setter: setTypeFilter,
    });

    let selectedSort = sortList.find((l) => l.data == sortFilter);
    setSortButtons({
      selected: selectedSort ? selectedSort : "Sort by",
      list: sortList,
      setter: setSortFilter,
    });
  }, [typeFilter, sortFilter]);

  return big ? (
    <div className="columns">
      <div className="column">
        <p className="my-auto">
          {resultCount}{" "}
          <Translate keyword={resultCount > 1 ? "items" : "item"} />
        </p>
      </div>
      <div className="column is-flex flex-gap">
        <div className="is-flex-grow-1" style={{ flexBasis: 0 }}>
          {typeButtons && <FullwidthDropdown {...typeButtons} />}
        </div>
        <div className="is-flex-grow-1" style={{ flexBasis: 0 }}>
          {sortButtons && <FullwidthDropdown {...sortButtons} />}
        </div>
        <div>
          <DisplayAddons
            colummClass={colummClass}
            setColumnClass={setColumnClass}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="columns">
      <div className="column">
        <div className="is-flex is-justify-content-space-between">
          <p className="my-auto">
            {resultCount}{" "}
            <Translate keyword={resultCount > 1 ? "items" : "item"} />
          </p>
          <div>
            <DisplayAddons
              colummClass={colummClass}
              setColumnClass={setColumnClass}
            />
          </div>
        </div>
      </div>
      <div className="column">
        {typeButtons && <FullwidthDropdown {...typeButtons} />}
      </div>
      <div className="column">
        {sortButtons && <FullwidthDropdown {...sortButtons} />}
      </div>
    </div>
  );
};

export default AssetTop;
