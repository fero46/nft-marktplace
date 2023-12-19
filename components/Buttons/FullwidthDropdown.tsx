import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Translate from "../Text/Translate";
import ImageLoader from "../Image/ImageLoader";
import Image from "next/image";

export interface FullwidthDropdownProps {
  selected: ButtonProps | string;
  list: ButtonProps[];
  setter: (e: any) => void;
  translate?: boolean;
}

export interface ButtonProps {
  title: string;
  icon?: IconDefinition;
  imgSrc?: string;
  data: any;
}

const FullwidthDropdown: React.FC<FullwidthDropdownProps> = ({
  selected,
  list,
  setter,
  translate,
  children,
}) => {
  const [childWidth, setChildWidth] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [parentClass, setParentClass] = useState<string>(
    "dropdown is-fullwidth is-block"
  );

  const ref = useRef<any>();

  useOnClickOutside(ref, () => setActive(false));

  useEffect(() => {
    ref.current && setChildWidth(ref.current.offsetWidth);
  }, [ref.current]);

  useEffect(() => {
    setParentClass(
      clsx("dropdown is-fullwidth is-block", active && "is-active")
    );
  }, [active]);

  const toggleActive = () => {
    ref.current && setChildWidth(ref.current.offsetWidth);

    setActive(!active);
  };

  const handleSelect = (e: any, selected: ButtonProps) => {
    setActive(false);
    setter(selected.data);
  };

  return (
    <div className={parentClass} ref={ref}>
      <div className="dropdown-trigger">
        <button
          className="button is-fullwidth is-flex is-justify-content-space-between"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleActive}
        >
          <div>
            {typeof selected === "string" ? (
              <span className="has-text-grey">
                {translate ? <Translate keyword={selected} /> : selected}
              </span>
            ) : (
              <>
                {selected.icon && (
                  <FontAwesomeIcon
                    icon={selected.icon}
                    className="my-auto mr-3"
                    size="lg"
                  />
                )}
                {selected.imgSrc && (
                  <ImageLoader
                    containerClass="is-16x16 my-auto mr-3 ml-0"
                    image={{
                      src: selected.imgSrc,
                      layout: "fill",
                      objectFit: "contain",
                    }}
                    circle
                  />
                )}
                <b>
                  {translate ? (
                    <Translate keyword={selected.title} />
                  ) : (
                    selected.title
                  )}
                </b>
              </>
            )}
          </div>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        style={{ width: childWidth }}
      >
        <div className="dropdown-content is-fullwidth">
          {list.map((el, i) => (
            <button
              className="dropdown-item button new-ghost is-fullwidth is-justify-content-start"
              onClick={(e) => handleSelect(e, el)}
              key={i}
            >
              {el.icon && (
                <FontAwesomeIcon
                  icon={el.icon}
                  className="my-auto mr-3"
                  size="lg"
                />
              )}
              {el.imgSrc && (
                <ImageLoader
                  containerClass="is-16x16 my-auto mr-3 ml-0"
                  image={{
                    src: el.imgSrc,
                    layout: "fill",
                    objectFit: "contain",
                  }}
                  circle
                />
              )}
              <b>{translate ? <Translate keyword={el.title} /> : el.title}</b>
            </button>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
};

export default FullwidthDropdown;
