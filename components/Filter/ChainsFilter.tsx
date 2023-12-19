import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { chainList } from "../../utils/currencies";
import { CurrencyProps } from "../../utils/types";
import FilterCheckButton from "./FilterCheckButton";
import { BubbleProps } from "./Bubble";
import { partition } from "../../hooks/helperFunctions";

interface ChainsFilterProps {
  getter?: string[];
  setter: Dispatch<SetStateAction<string[]>>;
  setBubbles: Dispatch<SetStateAction<BubbleProps[]>>;
}

interface ChainButtonProps extends CurrencyProps {
  selected: boolean;
}

const ChainsFilter: React.FC<ChainsFilterProps> = ({
  getter,
  setter,
  setBubbles,
}) => {
  const [chains, setChains] = useState<ChainButtonProps[]>();

  useEffect(() => {
    let temp: ChainButtonProps[] = chainList.map((c) => {
      return {
        ...c,
        selected: false,
      };
    });
    if (getter && getter.length > 0) {
      temp.forEach((c) => {
        if (getter.includes(c.name)) c.selected = true;
      });
    }
    setChains(temp);
    setBubbles((prev) => {
      let otherBubbles: BubbleProps[] = prev.filter((p) => p.tag !== "chains");
      if (temp) {
        let selected = temp.filter((c) => c.selected == true);
        let b: BubbleProps[] = selected.map((c) => {
          if (c.selected)
            return {
              title: c.short,
              icon: c.icon,
              tag: "chains",
              filterSetter: () =>
                setter((prev) => prev.filter((p) => p != c.name)),
            };
        });
        return [...otherBubbles, ...b];
      } else return [...otherBubbles];
    });
  }, [getter]);

  const handleSwap = (c: CurrencyProps, selected: boolean) => {
    if (selected) {
      setter((prev) => prev.filter((prev) => prev != c.name));
    } else {
      setter((prev) => [...prev, c.name]);
    }
  };

  return (
    <>
      {chains &&
        chains.map((el, i) => (
          <FilterCheckButton
            key={i}
            title={el.name}
            icon={el.icon}
            data={el}
            swapper={handleSwap}
            selected={el.selected}
          />
        ))}
    </>
  );
};

export default ChainsFilter;
