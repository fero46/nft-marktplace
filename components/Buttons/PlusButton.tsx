import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface PlusButtonProps {
  callback: any;
}

const PlusButton: React.FC<PlusButtonProps> = ({ callback }) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <button
      className="button is-ghost p-0"
      style={{ width: "2rem", height: "2rem" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={callback}
    >
      <FontAwesomeIcon
        icon={faPlusSquare}
        width={40}
        height={40}
        size="3x"
        color={hover ? "blue" : undefined}
      />
    </button>
  );
};

export default PlusButton;
