import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import FilterCheckButton from "./FilterCheckButton";
import { CollectionProps } from "../../utils/types";
import { BubbleProps } from "./Bubble";
import { useRouter } from "next/router";

interface CollectionFilterProps {
  selectedCollections: CollectionProps[];
  initialCollections: CollectionProps[];
  setter: Dispatch<SetStateAction<string[]>>;

  //should come with data before mount
  //and should be edited from outside
}

const CollectionFilter: React.FC<CollectionFilterProps> = ({
  selectedCollections,
  initialCollections,
  setter,
}) => {
  const router = useRouter();

  const handleSwap = (c: CollectionProps, selected: boolean) => {
    if (selected) {
      setter((prev) => prev.filter((p) => p != c.name));
    } else {
      setter((prev) => [...prev, c.name]);
    }
  };

  return (
    <>
      {selectedCollections &&
        selectedCollections.map((el, i) => (
          <FilterCheckButton
            key={i}
            title={el.name}
            imageSrc={el.imageSrc}
            data={el}
            swapper={handleSwap}
            selected={true}
          />
        ))}
      {initialCollections &&
        initialCollections.map((el, i) => (
          <FilterCheckButton
            key={i}
            title={el.name}
            imageSrc={el.imageSrc}
            data={el}
            swapper={handleSwap}
          />
        ))}
    </>
  );
};

export default CollectionFilter;
