import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";
import { BubbleProps } from "./Bubble";
import Translate, { useTranslate } from "../Text/Translate";

export interface StatusFilterProps {
  getter: string[];
  setter: Dispatch<SetStateAction<string[]>>;
  setBubbles: Dispatch<SetStateAction<BubbleProps[]>>;
}

export interface StatusProps {
  value: string;
  selected: boolean;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  getter,
  setter,
  setBubbles,
}) => {
  const [status, setStatus] = useState<StatusProps[]>();

  const statuses: StatusProps[] = [
    {
      value: "buy_now",
      selected: false,
    },
    {
      value: "on_auction",
      selected: false,
    },
    {
      value: "new",
      selected: false,
    },
    {
      value: "has_offers",
      selected: false,
    },
  ];

  useEffect(() => {
    let temp = statuses;
    temp.forEach((s) => {
      if (getter.includes(s.value)) s.selected = true;
      else s.selected = false;
    });
    setStatus(temp);
    setBubbles((prev) => {
      let otherBubbles: BubbleProps[] = prev.filter((p) => p.tag !== "status");
      if (temp) {
        let selected = temp.filter((s) => s.selected == true);
        let b: BubbleProps[] = selected.map((s) => {
          if (s.selected)
            return {
              title: s.value,
              tag: "status",
              data: s.value,
              translate: true,
              filterSetter: () =>
                setter((prev) => prev.filter((p) => p != s.value)),
            };
        });
        return [...otherBubbles, ...b];
      } else return [...otherBubbles];
    });
  }, [getter]);

  // const sendStatus = useCallback(
  //   (status: StatusProps[]) => {
  //     setter(status.filter((s) => s.selected == true).map((s) => s.value));
  //   },
  //   [getter]
  // );

  const handleSelect = (el: StatusProps) => {
    if (status) {
      setter((prev) => {
        if (prev.includes(el.value)) {
          return prev.filter((p) => p != el.value);
        } else {
          return [...prev, el.value];
        }
      });
    }
  };

  return (
    <div className="columns is-mobile is-multiline">
      {status &&
        status.map((el, i) => (
          <div className="column is-half" key={i}>
            <button
              className={clsx(
                "button is-fullwidth has-text-left",
                el.selected && "is-info"
              )}
              onClick={(e) => handleSelect(el)}
            >
              <Translate keyword={el.value} />
            </button>
          </div>
        ))}
    </div>
  );
};

export default StatusFilter;
