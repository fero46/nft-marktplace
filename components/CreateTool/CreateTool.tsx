import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NFTPropertyProps, NFTStatLevelProps } from "../../utils/types";
import NFTPropertiesRow from "./PropertiesRow";
import { deepCopy } from "../../hooks/helperFunctions";
import StatLevelRow from "./StatLevelRow";
import { toast } from "react-toastify";
import Translate from "../Text/Translate";

interface CreateToolProps {
  type: "properties" | "levels" | "stats";
  list: NFTPropertyProps[] | NFTStatLevelProps[];
  setter: Dispatch<SetStateAction<any>>;
  modalSetter: Dispatch<SetStateAction<boolean>>;
}

const defaultProperty: NFTPropertyProps = {
  tag: "",
  value: "",
};

const defaultStatLevel: NFTStatLevelProps = {
  name: "",
  value: "",
  outOf: "",
};

const CreateTool: React.FC<CreateToolProps> = ({
  type,
  list,
  setter,
  modalSetter,
}) => {
  const [tempList, setTempList] = useState<
    NFTPropertyProps[] | NFTStatLevelProps[]
  >(list);
  const [errorIndex, setErrorIndex] = useState<number>(NaN);

  useEffect(() => {
    if (!list.length) {
      if (type == "properties") setTempList([deepCopy(defaultProperty)]);
      else setTempList([deepCopy(defaultStatLevel)]);
    }
  }, []);

  const handleChange = (
    i: number,
    k: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    if (errorIndex) setErrorIndex(NaN);
    let newTemp = [...tempList];
    //@ts-ignore
    newTemp[i][k] = e.currentTarget.value;
    //@ts-ignore
    setTempList(newTemp);
  };

  const handleAdd = () => {
    if (type == "properties")
      setTempList((prev) => [...prev, deepCopy(defaultProperty)]);
    else setTempList((prev) => [...prev, deepCopy(defaultStatLevel)]);
  };

  const handleRemoveLast = () => {
    //@ts-ignore
    setTempList((prev) => [...prev.slice(0, -1)]);
  };

  const handleSave = () => {
    let newTemp = [...tempList];

    if (type == "properties") {
      const last = newTemp[newTemp.length - 1] as NFTPropertyProps;
      if (!last.tag && !last.value) {
        //the last element is completely empty, which means everything is fine
        //get rid of the last element and move on
        newTemp = [...newTemp.slice(0, -1)];
        setter(newTemp);
      } else if (!last.tag || !last.value) {
        setErrorIndex(newTemp.length - 1);
        toast.error("Either delete element or fill its inputs");
        //the last element has an empty space, alert user
        return;
      }
    } else {
      const last = newTemp[newTemp.length - 1] as NFTStatLevelProps;
      if (!last.name && !last.outOf && !last.value) {
        //the last element is completely empty, which means everything is fine
        //get rid of the last element and move on
        setErrorIndex(newTemp.length - 1);
        newTemp = [...newTemp.slice(0, -1)];

        //if value is bigger than limit, alert user
        let i = 0;
        for (const t of newTemp as NFTStatLevelProps[]) {
          if (parseInt(t.value) > parseInt(t.outOf)) {
            setErrorIndex(i);
            toast.error(
              "Left-side number can't be greater than the right-side number"
            );
            return;
          }
          i++;
        }
        i = NaN;

        setter(newTemp);
      } else if (!last.name || !last.outOf || !last.value) {
        //the last element has an empty space, alert user
        setErrorIndex(newTemp.length - 1);
        toast.error("Either delete element or fill its inputs");
        return;
      }
    }
    modalSetter(false);
  };

  return (
    <>
      <h2 className="is-title is-size-3 is-capitalized">
        <Translate keyword={type} />
      </h2>
      <table className="table half-table">
        <thead>
          <tr>
            <td>
              <Translate keyword="name" />
            </td>
            <td>
              <Translate keyword="value" />
            </td>
          </tr>
        </thead>
        <tbody>
          {type == "properties"
            ? (tempList as NFTPropertyProps[]).map((property, index) => (
                <NFTPropertiesRow
                  key={index}
                  index={index}
                  length={tempList.length}
                  p={property}
                  handleChange={handleChange}
                  adder={handleAdd}
                  remover={handleRemoveLast}
                  error={index === errorIndex}
                />
              ))
            : (tempList as NFTStatLevelProps[]).map((sl, index) => (
                <StatLevelRow
                  key={index}
                  index={index}
                  length={tempList.length}
                  p={sl}
                  handleChange={handleChange}
                  adder={handleAdd}
                  remover={handleRemoveLast}
                  error={index === errorIndex}
                />
              ))}
        </tbody>
      </table>
      <button className="button is-info is-fullwidth" onClick={handleSave}>
        <Translate keyword="save_changes" />
      </button>
    </>
  );
};

export default CreateTool;
