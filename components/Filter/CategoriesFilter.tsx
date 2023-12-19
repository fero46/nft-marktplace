import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterCheckButton from "./FilterCheckButton";
import { SubmenuProps } from "../Layout/Navbar";
import categoryList from "../../utils/categories";
import { BubbleProps } from "./Bubble";

interface CategoriesFilterProps {
  getter?: string[];
  setter: Dispatch<SetStateAction<string[]>>;
  setBubbles: Dispatch<SetStateAction<BubbleProps[]>>;
}

interface CategoriesButtonProps extends SubmenuProps {
  selected: boolean;
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  getter,
  setter,
  setBubbles,
}) => {
  const [categories, setCategories] = useState<CategoriesButtonProps[]>();

  //change state after fetch
  useEffect(() => {
    let temp: CategoriesButtonProps[] = categoryList.map((c) => {
      return {
        ...c,
        selected: false,
      };
    });
    if (getter && getter.length > 0)
      temp.forEach((c) => {
        if (getter.length > 0 && getter[0] === c.title) {
          c.selected = true;
        }
      });

    setCategories(temp);
    setBubbles((prev) => {
      let otherBubbles: BubbleProps[] = prev.filter(
        (p) => p.tag !== "categories"
      );
      if (temp) {
        let selected = temp.filter((c) => c.selected == true);
        let b: BubbleProps[] = selected.map((c) => {
          if (c.selected)
            return {
              title: c.title,
              icon: c.icon,
              tag: "categories",
              filterSetter: () => setter([]),
            };
        });
        return [...otherBubbles, ...b];
      } else return [...otherBubbles];
    });
  }, [getter]);

  const handleSwap = (c: SubmenuProps, selected: boolean) => {
    if (selected) {
      setter([]);
    } else {
      setter([c.title]);
    }
  };

  return (
    <>
      {categories &&
        categories.map((el, i) => (
          <FilterCheckButton
            key={i}
            title={el.title}
            icon={el.icon}
            data={el}
            swapper={handleSwap}
            selected={el.selected}
            translate
          />
        ))}
    </>
  );
};

export default CategoriesFilter;
