import { Dispatch, SetStateAction } from "react";
import Bubble, { BubbleProps } from "./Bubble";

interface AssetBubblesProps {
  bubbles: BubbleProps[];
}

const AssetBubbles: React.FC<AssetBubblesProps> = ({ bubbles }) => {
  //comment
  const clearAll = () => {
    bubbles.forEach((b) => b.filterSetter());
  };

  return (
    <div className="is-flex is-flex-direction-row mb-5 flex-gap is-flex-wrap-wrap">
      {bubbles.map((bubble, i) => (
        <Bubble {...bubble} key={i} />
      ))}
      <button className="button is-ghost py-5" onClick={clearAll}>
        Clear All
      </button>
    </div>
  );
};

export default AssetBubbles;
