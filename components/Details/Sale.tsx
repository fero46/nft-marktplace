import { faClock } from "@fortawesome/free-regular-svg-icons";
import { PriceProps } from "../../utils/types";
import React, { useEffect, useState } from "react";
import Collapsible from "../Buttons/Collapsible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faWallet } from "@fortawesome/free-solid-svg-icons";
import Translate from "../Text/Translate";

interface SaleProps {
  endDate: Date;
  currentPrice: PriceProps;
}

const Sale: React.FC<SaleProps> = ({ endDate, currentPrice }) => {
  const inDollars =
    currentPrice.currency.dolarExchangeRate * currentPrice.ammount;

  return (
    <div className="card">
      <Collapsible
        icon={faClock}
        isGray={true}
        title={endDate.toDateString()}
        isCollapsible={false}
      >
        <p className="has-text-grey">
          {" "}
          <Translate keyword="current_price" />
        </p>
        <div className="is-flex">
          <span className="is-title is-size-3 mt-auto has-text-black">
            <FontAwesomeIcon
              icon={currentPrice.currency.icon}
              className="mr-3"
            />
            {currentPrice.ammount}
          </span>
          <p className="has-text-grey mt-auto pb-2 ml-3">(${inDollars})</p>
        </div>
        <div className="columns mt-3">
          <div className="column is-two-thirds columns">
            <div className="column">
              <button className="button is-fullwidth is-link is-medium">
                <FontAwesomeIcon icon={faWallet} className="mr-3" />
                <Translate keyword="buy_now" />
              </button>
            </div>
            <div className="column">
              <button className="button is-fullwidth is-link is-outlined is-medium">
                <FontAwesomeIcon icon={faTag} className="mr-3" />
                <Translate keyword="make_offer" />
              </button>
            </div>
          </div>
        </div>
      </Collapsible>
    </div>
  );
};

export default Sale;
