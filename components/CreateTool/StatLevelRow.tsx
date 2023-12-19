import { removeListener } from "process";
import React, { useEffect } from "react";
import { NFTStatLevelProps } from "../../utils/types";
import clsx from "clsx";

interface StatLevelRowProps {
  index: number;
  length: number;
  p: NFTStatLevelProps;
  handleChange: (
    i: number,
    k: string,
    e: React.FormEvent<HTMLInputElement>
  ) => void;
  adder: () => void;
  remover: () => void;
  error: boolean;
}

const StatLevelRow: React.FC<StatLevelRowProps> = ({
  index,
  length,
  p,
  adder,
  remover,
  handleChange,
  error,
}) => {
  useEffect(() => {
    if (index == length - 1 && p.name.length > 0 && p.value && p.outOf) adder();
    else if (
      index != length - 1 &&
      length > 1 &&
      (p.name.length === 0 ||
        p.value.toString() === "" ||
        p.outOf.toString() === "")
    )
      remover();
  }, [p.name, p.value, p.outOf]);

  return (
    <tr>
      <td>
        <input
          type="text"
          className={clsx("input", error && "is-danger")}
          value={p.name}
          onChange={(e) => handleChange(index, "name", e)}
          placeholder="Speed"
        />
      </td>
      <td>
        <div className="is-flex">
          <input
            type="number"
            className={clsx("input", error && "is-danger")}
            value={p.value}
            onChange={(e) =>
              (!e.currentTarget.value ||
                parseInt(e.currentTarget.value) < 100000) &&
              handleChange(index, "value", e)
            }
            placeholder="7"
          />
          <b className="mx-5 my-auto">of</b>
          <input
            type="number"
            className={clsx("input", error && "is-danger")}
            value={p.outOf}
            onChange={(e) =>
              (!e.currentTarget.value ||
                parseInt(e.currentTarget.value) < 100000) &&
              handleChange(index, "outOf", e)
            }
            placeholder="10"
          />
        </div>
      </td>
    </tr>
  );
};

export default StatLevelRow;
