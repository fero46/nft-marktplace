import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface OwnerCreatorProps {
  name: string;
  wallet: string;
  isVerified?: boolean;
}

export interface NFTDetailsProps {
  address: string;
  tokenID: string;
  tokenStandard: string;
  blockChain: string;
}

export interface ItemActivityProps {
  event: string;
  price: string;
  from: OwnerCreatorProps;
  to: OwnerCreatorProps;
  date: Date;
}

export interface NFTPropertyProps {
  tag: string;
  value: string;
  rarity?: number;
}

export interface NFTStatLevelProps {
  name: string;
  value: string;
  outOf: string;
}

export interface ReferenceProps {
  platform: string;
  href: string;
}

export interface CollectionProps {
  name: string;
  symbol: string;
  createdBy?: OwnerCreatorProps;
  imageSrc?: string;
  reference?: ReferenceProps[];
  stats?: string;
  description?: string;
  isVerified?: boolean;
  contractAddress?: string;
}

export interface PriceProps {
  currency: CurrencyProps;
  ammount: number;
}

export interface CurrencyProps {
  name: string;
  icon: IconDefinition;
  short: string;
  dolarExchangeRate: number;
}

export interface NFTTraitsProps {
  trait: {
    name: string;
    valueType: "PROPERTIES | STATS | LEVELS";
  };
  value: string;
}
