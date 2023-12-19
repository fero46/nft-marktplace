import { Dispatch, SetStateAction, useEffect, useState } from "react";
import currencyList from "../../utils/currencies";
import { CurrencyProps } from "../../utils/types";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import FilterCheckButton from "./FilterCheckButton";
import { BubbleProps } from "./Bubble";

interface OnSaleInFilterProps {
  getter?: string[];
  setter: Dispatch<SetStateAction<string[]>>;
  setBubbles: Dispatch<SetStateAction<BubbleProps[]>>;
}

interface ChainButtonProps extends CurrencyProps {
  selected: boolean;
}

const OnSaleInFilter: React.FC<OnSaleInFilterProps> = ({
  getter,
  setter,
  setBubbles,
}) => {
  const [currencies, setCurrencies] = useState<ChainButtonProps[]>();

  useEffect(() => {
    let temp: ChainButtonProps[] = currencyList.map((c) => {
      return {
        ...c,
        selected: false,
      };
    });
    if (getter)
      temp.forEach((c) => {
        if (getter.includes(c.short)) c.selected = true;
      });
    setCurrencies(temp);
    setBubbles((prev) => {
      let otherBubbles: BubbleProps[] = prev.filter(
        (p) => p.tag !== "onSaleIn"
      );
      if (temp) {
        let selected = temp.filter((c) => c.selected == true);
        let b: BubbleProps[] = selected.map((c) => {
          if (c.selected)
            return {
              title: c.short,
              icon: c.icon,
              tag: "onSaleIn",
              filterSetter: () =>
                setter((prev) => prev.filter((p) => p != c.short)),
            };
        });
        return [...otherBubbles, ...b];
      } else return [...otherBubbles];
    });
  }, [getter]);

  const handleSwap = (c: CurrencyProps, selected: boolean) => {
    if (selected) {
      setter((prev) => prev.filter((prev) => prev != c.short));
    } else {
      setter((prev) => [...prev, c.short]);
    }
  };

  return (
    <>
      {currencies &&
        currencies.map((el, i) => (
          <FilterCheckButton
            key={i}
            title={el.short}
            icon={faCircle}
            data={el}
            swapper={handleSwap}
            selected={el.selected}
          />
        ))}
    </>
  );
};

export default OnSaleInFilter;
