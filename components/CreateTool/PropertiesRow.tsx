import clsx from "clsx";
import { removeListener } from "process";
import React, { useEffect } from "react";
import { NFTPropertyProps } from "../../utils/types";

interface NFTPropertiesRowProps {
  index: number;
  length: number;
  p: NFTPropertyProps;
  handleChange: (
    i: number,
    k: string,
    e: React.FormEvent<HTMLInputElement>
  ) => void;
  adder: () => void;
  remover: () => void;
  error: boolean;
}

const NFTPropertiesRow: React.FC<NFTPropertiesRowProps> = ({
  index,
  length,
  p,
  adder,
  remover,
  handleChange,
  error,
}) => {
  useEffect(() => {
    if (index == length - 1 && p.value.length > 0 && p.tag.length > 0) adder();
    else if (
      index != length - 1 &&
      length > 1 &&
      (p.value.length === 0 || p.tag.length === 0)
    )
      remover();
  }, [p.tag, p.value]);

  return (
    <tr>
      <td>
        <input
          type="text"
          className={clsx("input", error && "is-danger")}
          value={p.tag}
          onChange={(e) => handleChange(index, "tag", e)}
          placeholder="Character"
        />
      </td>
      <td>
        <input
          type="text"
          className={clsx("input", error && "is-danger")}
          value={p.value}
          onChange={(e) => handleChange(index, "value", e)}
          placeholder="Male"
        />
      </td>
    </tr>
  );
};

export default NFTPropertiesRow;
