export interface WalletData {
  id: number;
  address: String;
  is_whiteListed: boolean;
  web3_token: string;
}

export interface TUser {
  id: number;
  // web3_token: string;
  nickname?: string;
  username?: string;
  bio?: string;
  profile_image?: string;
  background_image?: string;
  wallet?: WalletData;
}
const host = process.env.NEXT_PUBLIC_API_URL;

export const validate = async (user: TUser) => {
  const response = await fetch(`${host}/api/v1/validate`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: user.web3_token,
    },
  });
  return response.json();
};
