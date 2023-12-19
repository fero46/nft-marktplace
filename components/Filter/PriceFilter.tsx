import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { CurrencyProps } from "../../utils/types";
import FullwidthDropdown from "../Buttons/FullwidthDropdown";
import { usDollar, etherium } from "../../utils/currencies";
import { PriceQueryProps } from "./AssetsFilter";
import { BubbleProps } from "./Bubble";
import Translate, { useTranslate } from "../Text/Translate";

export interface PriceFilterProps {
  getter: PriceQueryProps;
  setter: Dispatch<SetStateAction<PriceQueryProps>>;
  setBubbles: Dispatch<SetStateAction<BubbleProps[]>>;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  getter,
  setter,
  setBubbles,
}) => {
  const [currencyValue, setCurrencyValue] = useState<CurrencyProps>(etherium);
  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");

  //placeholder translations
  const min = useTranslate("min");
  const max = useTranslate("max");

  //usd translation
  // const usd = useTranslate("usd") + " (USD)"

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(e.target.value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(e.target.value);
  };

  const handleCurrecyChange = (c: CurrencyProps) => {
    setCurrencyValue(c);
  };

  useEffect(() => {
    if (getter.currencyName.length != 0 && getter.currencyName[0] == "USD") {
      setCurrencyValue(usDollar);
    } else setCurrencyValue(etherium);
    if (getter.min.length != 0) {
      setMinValue(getter.min[0]);
    } else setMinValue("");
    if (getter.max.length != 0) {
      setMaxValue(getter.max[0]);
    } else setMaxValue("");

    setBubbles((prev) => {
      let otherBubbles: BubbleProps[] = prev.filter((p) => p.tag !== "price");
      if (getter.min.length > 0 || getter.max.length > 0) {
        let title =
          (getter.min.length > 0 ? getter.min[0] + " < " : "") +
          getter.currencyName[0] +
          (getter.max.length > 0 ? " < " + getter.max[0] : "");
        let b: BubbleProps = {
          title: title,
          icon: currencyValue.icon,
          tag: "price",
          filterSetter: () =>
            setter({
              currencyName: [],
              min: [],
              max: [],
            }),
        };

        return [...otherBubbles, b];
      } else return [...otherBubbles];
    });
  }, [getter]);

  const handleApply = () => {
    let temp = {
      currencyName: minValue || maxValue ? [currencyValue.short] : [],
      min: minValue ? [minValue] : [],
      max: maxValue ? [maxValue] : [],
    };
    setter(temp);
  };

  return (
    <>
      <FullwidthDropdown
        selected={{
          title: currencyValue.name + " (" + currencyValue.short + ")",
          icon: currencyValue.icon,
          data: currencyValue,
        }}
        list={[
          {
            title: etherium.name + " (" + etherium.short + ")",
            icon: etherium.icon,
            data: etherium,
          },
          {
            title: usDollar.name + " (" + usDollar.short + ")",
            icon: usDollar.icon,
            data: usDollar,
          },
        ]}
        setter={handleCurrecyChange}
      />
      <div className="columns is-mobile mt-3">
        <div className="column is-flex-grow-1">
          <input
            className="input"
            type="number"
            placeholder={min}
            value={minValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleMinChange(e)
            }
          ></input>
        </div>
        <p className="my-auto">
          <Translate keyword="to" />
        </p>
        <div className="column is-flex-grow-1">
          <input
            className="input"
            type="number"
            placeholder={max}
            value={maxValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleMaxChange(e)
            }
          ></input>
        </div>
      </div>
      <button
        className="button is-block is-medium is-half mx-auto"
        disabled={
          Boolean(minValue && maxValue)
            ? parseFloat(minValue) >= parseFloat(maxValue)
            : Boolean(!minValue && !maxValue)
        }
        onClick={handleApply}
      >
        <b>
          <Translate keyword="apply" />
        </b>
      </button>
    </>
  );
};

export default PriceFilter;
