import { CollectionProps } from "../utils/types";
import { UserLike } from "./likes";
import { WalletData } from "./wallet";

const host = process.env.NEXT_PUBLIC_API_URL;

interface TraitProps {
  trait: {
    name: string;
    value_type: "PROPERTIES" | "STATS" | "LEVELS";
  };
  value: string;
}
interface LazyNFT {
  name: string | undefined;
  collection: CollectionProps | undefined;
  image_url: File | undefined;
  asset_type: string | undefined;
  external: string | undefined;
  description: string | undefined;
  traits: TraitProps[];
  chainId: number | undefined;
  signer: string | null | undefined;
}

export interface User {
  username: string;
  nickname: string;
  wallet: WalletData;
  sign_nonce: string;
  background_image?: string;
  profile_image?: string;
  nfts: NFTObjectData[];
}

export interface NFTObjectData {
  id?: number;
  name?: string;
  description?: string;
  ipfs_hash?: string;
  assetType?: string;
  bannerImage?: string;
  token_uri?: string;
  status?: number;
  price?: string;
  image_uri?: string;
  loyalty_fee?: number;
  updatedAt?: number;
  createdAt?: number;
  creator?: WalletData;
  owner?: WalletData;
  token_id?: string;
  timestamp?: string;
  attributes?: [];
  category?: Category;
  collection?: Collection;
  followers?: User[];
  followeds?: User[];
  likes?: UserLike[];
  totalLikes?: number;
  liked_by_user?: boolean;
  deadline?: string;
  minBidIncPercent: number;
  inst_buy_price: number;
}

export interface NFTMetadataObject {
  name?: string;
  description?: string;
  image?: string;
  category?: string;
  collection?: string;
}

export interface Category {
  name?: string;
}

export interface Collection {
  contract_address: string;
  collection_name?: string;
  description?: string;
  background_img?: string;
}

export const lazy_mint = async (formdata: FormData) => {
  const response = await fetch(
    `${host}/api/v1/lazy_operations/lazy_mint
  `,
    {
      method: "POST",
      // mode: "no-cors",
      headers: {},
      body: formdata,
    }
  );

  return response.status;
};

export const all_nfts = async (nfts: LazyNFT[]) => {
  const response = await fetch(
    `${host}/api/v1/nfts
      `,
    {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await response.json();

  return responseData;
};
