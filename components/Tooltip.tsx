import React from "react";
import ReactTooltip from "react-tooltip";

interface TooltipProps {
  placement?: "top" | "right" | "bottom" | "left";
}

const Tooltip: React.FC<TooltipProps> = ({ placement = "top" }) => {
  return (
    <ReactTooltip effect="solid" backgroundColor="#161d27" place={placement} />
  );
};

export default Tooltip;
