import { ethers, VoidSigner } from 'ethers'
import { TypedDataUtils } from 'ethers-eip712'
import { getSigner } from './index'

const SIGNING_DOMAIN_NAME = 'REDNFT'
const SIGNING_DOMAIN_VERSION = '1'

export class LazyMinter {
  contractAddress: string
  signer: VoidSigner

  types: {
    EIP712Domain: {
      name: string
      type: string
    }[]
    NFT: {
      name: string
      type: string
    }[]
  }

  domain: {
    name: string
    version: string
    verifyingContract: string
    chainId: number
  }

  constructor(contractAddress: string, signer: ethers.VoidSigner, chainId: number) {
    this.contractAddress = contractAddress
    this.signer = signer

    this.types = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      NFT: [
        { name: 'creator', type: 'address' },
        { name: 'price', type: 'uint256' },
        { name: 'tokenURI', type: 'string' },
        { name: 'creatorLoyalty', type: 'uint8' },
      ],
    }
    this.domain = {
        name: SIGNING_DOMAIN_NAME,
        version: SIGNING_DOMAIN_VERSION,
        verifyingContract: this.contractAddress,
        chainId,
      }
  }

 
  _signingDomain() {
    const chainId = 80001
    this.domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    }
    return this.domain
  }

  async _formatVoucher(voucher: { creator: any; price: any; tokenURI: any; creatorLoyalty: any }) {
    const domain =  this._signingDomain()
    return {
      domain,
      types: this.types,
      primaryType: 'NFT',
      message: voucher,
    }
  }

  async createVoucher(creator: any,price: any, tokenURI: any, creatorLoyalty: any) {

 
    
    const voucher = { creator,price, tokenURI, creatorLoyalty }
    const typedData = await this._formatVoucher(voucher)
    const digest = TypedDataUtils.encodeDigest(typedData)

    const signature = await this.signer._signTypedData(
      this.domain,
      { NFT: this.types.NFT },
      voucher
    )
    const recoveredAddress= await ethers.utils.verifyTypedData( this.domain,
      { NFT: this.types.NFT },
      voucher,signature);


    return {
      voucher,
      signature,
      recoveredAddress
    }
  }
}