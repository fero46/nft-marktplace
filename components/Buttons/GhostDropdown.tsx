import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Translate from "../Text/Translate";

export interface GhostDropdownProps {
  title: string;
  img?: string;
  translate?: boolean;
  children: React.ReactNode;
}

//so... how does this work with typescript????????????????
//all this to close a dropdown on click :)
const GhostDropdown = forwardRef<GhostDropdownProps, HTMLDivElement>(
  (props: GhostDropdownProps, ref) => {
    const [show, setShow] = useState<boolean>(false);

    const showRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(showRef, () => setShow(false));

    useImperativeHandle<any, any>(
      ref,
      () => ({
        close() {
          setShow(false);
        },
      }),
      undefined
    );

    return (
      <div className={clsx("dropdown", show && "is-active")} ref={showRef}>
        <div className="dropdown-trigger">
          <button
            className="button new-ghost"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => setShow((prev) => !prev)}
          >
            <b>
              {props.translate ? (
                <Translate keyword={props.title} />
              ) : (
                props.title
              )}
            </b>
            <FontAwesomeIcon icon={faAngleDown} className="ml-3" />
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content py-0">{props.children}</div>
        </div>
      </div>
    );
  }
);

GhostDropdown.displayName = "GhostDropdown";
export default GhostDropdown;
