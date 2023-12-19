import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { CurrencyProps } from "./types";

export const etherium: CurrencyProps = {
  name: "Etherium",
  icon: faEthereum,
  short: "ETH",
  dolarExchangeRate: 100,
};

export const polygon: CurrencyProps = {
  name: "Polygon",
  icon: faEthereum,
  short: "POL",
  dolarExchangeRate: 100,
};

export const klatyn: CurrencyProps = {
  name: "Klatyn",
  icon: faEthereum,
  short: "KLA",
  dolarExchangeRate: 100,
};

export const usDollar: CurrencyProps = {
  name: "United States Dollar",
  icon: faDollarSign,
  short: "USD",
  dolarExchangeRate: 1,
};

const currencyList = [etherium, polygon, klatyn];
export const chainList = [etherium, polygon, klatyn];
export default currencyList;
