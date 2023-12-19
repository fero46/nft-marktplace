import { faTh, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";
import Addon from "../Buttons/Addon";
import { useTranslate } from "../Text/Translate";

interface DisplayAddonsProps {
  colummClass: "small" | "large";
  setColumnClass: Dispatch<SetStateAction<"small" | "large">>;
}

const DisplayAddons: React.FC<DisplayAddonsProps> = ({
  colummClass,
  setColumnClass,
}) => {
  //translation
  const large = useTranslate("large_display");
  const small = useTranslate("small_display");

  return (
    <div className="field has-addons mb-0">
      <Addon
        icon={faThLarge}
        tooltipText={large}
        button={{
          action: () => setColumnClass("large"),
          disabled: colummClass == "large",
        }}
      />
      <Addon
        icon={faTh}
        tooltipText={small}
        button={{
          action: () => setColumnClass("small"),
          disabled: colummClass == "small",
        }}
      />
    </div>
  );
};

export default DisplayAddons;
