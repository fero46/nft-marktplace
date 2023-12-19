import { NFTObjectData } from './nfts'
import { TUser } from '../../hooks/useAuth'
import { WalletData } from './wallets'

const host = process.env.REACT_APP_API_URL

export interface UserLike {
  user_id?: string
  nft_id?: string
  user?: TUser
  nft?: NFTObjectData
}
export const likeIt = async (user: any, nft: any) => {
  const response = await fetch(`${host}/api/v1/activity/likeIt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: user.authentication_token,
    },
    body: JSON.stringify({ nft_id: nft.id }),
  })
  const responseData = await response.json()

  return responseData
}

// deprecated
export const likes = async (user: any) => {
  const response = await fetch(`${host}/api/v1/activity/likes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: user.authentication_token,
    },
  })
  const responseData = await response.json()

  const data: UserLike = responseData
  return data
}