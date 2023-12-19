// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NFTCardProps } from "../../components/Gallery/NFTCard";
import { TUser } from "../../external_api/wallet";
import { loremIpsum, LoremIpsum } from "lorem-ipsum";
import { Collection } from "../../external_api/nfts";
const RandExp = require("randexp");

const fakeOwners: TUser[] = [
  {
    id: 1,
    wallet: {
      web3_token: "0x851faa83a85f5701a31ae591636700a6305beb8d",
      address: "(web3_token)",
      is_whiteListed: false,
      id: 1,
    },
    nickname: "wpoolman0",
    username: "jdanforth0",
    bio: undefined,
    profile_image: "https://via.placeholder.com/987x06/EF12B5/F98E86",
    background_image: "https://via.placeholder.com/583x260/FFFF20/33FF7E",
  },
  {
    id: 2,
    wallet: {
      web3_token: "0xa654d980a7eb926ebc8181901717209bbe595729",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 2,
    },
    nickname: "gdewdeny1",
    username: "hfishlee1",
    bio: "Ritchie-Parker",
    profile_image: "https://via.placeholder.com/71x319/369CFD/F9E99F",
    background_image: "https://via.placeholder.com/386x41/27E09C/E14F30",
  },
  {
    id: 3,
    wallet: {
      web3_token: "0x6bd83db6159034559579a8fb41c309dad585d225",
      address: "(web3_token)",
      is_whiteListed: false,
      id: 3,
    },
    nickname: undefined,
    username: "rgodley2",
    bio: undefined,
    profile_image: "https://via.placeholder.com/66x090/4FDF0D/8DFF0F",
    background_image: "https://via.placeholder.com/73x001/6407FD/FEFFEF",
  },
  {
    id: 4,
    wallet: {
      web3_token: "0x67c5127e1d4b7a3266093aa9a309036905fbf479",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 4,
    },
    nickname: "dpibworth3",
    username: "kbrigstock3",
    bio: undefined,
    profile_image: "https://via.placeholder.com/400x300/0EDFF3/CDE620",
    background_image: "https://via.placeholder.com/782x82/025EDF/EC0EE5",
  },
  {
    id: 5,
    wallet: {
      web3_token: "0x4c61c494cf565bb699ea76334f5aa0068ac2deae",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 5,
    },
    nickname: "rsendall4",
    username: "mfewtrell4",
    bio: "Morissette, Schamberger and Shields",
    profile_image: "https://via.placeholder.com/41x96/F9CA35/D4CDFC",
    background_image: "https://via.placeholder.com/88x60/697E5F/4D123C",
  },
  {
    id: 6,
    wallet: {
      web3_token: "0xcfb2f1490fae8921248f7e34f27ed41d60561d52",
      address: "(web3_token)",
      is_whiteListed: false,
      id: 6,
    },
    nickname: "gverney5",
    username: "gpullan5",
    bio: "Bins LLC",
    profile_image: "https://via.placeholder.com/83x04/3D8990/8EB1EF",
    background_image: "https://via.placeholder.com/975x30/7FEF4F/B9F83A",
  },
  {
    id: 7,
    wallet: {
      web3_token: "0xa1d5fa473ee4a0580574d9d231a3da3af8d3b1b9",
      address: "(web3_token)",
      is_whiteListed: false,
      id: 7,
    },
    nickname: undefined,
    username: "jworral6",
    bio: undefined,
    profile_image: "https://via.placeholder.com/052x113/9524C4/FE2FC2",
    background_image: "https://via.placeholder.com/826x973/FDFD44/F2D46E",
  },
  {
    id: 8,
    wallet: {
      web3_token: "0x998f8d0a390435a97d0b47607a75e6cc4ff66e45",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 8,
    },
    nickname: "jrowley7",
    username: "evarran7",
    bio: undefined,
    profile_image: "https://via.placeholder.com/987x78/34E227/4F81EF",
    background_image: "https://via.placeholder.com/168x075/4518FF/6477F4",
  },
  {
    id: 9,
    wallet: {
      web3_token: "0x73e745e4dce64cec1b4feb7198cef519c9d7793f",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 9,
    },
    nickname: "emonteath8",
    username: "valvarado8",
    bio: undefined,
    profile_image: "https://via.placeholder.com/95x99/82EF20/3F7910",
    background_image: "https://via.placeholder.com/85x728/F93191/81FF71",
  },
  {
    id: 10,
    wallet: {
      web3_token: "0xb332243088b9ca75bec8a830e43708ddb3431c3e",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 10,
    },
    nickname: "efreschi9",
    username: "fboliver9",
    bio: undefined,
    profile_image: "https://via.placeholder.com/523x228/ECBFFE/FF751D",
    background_image: "https://via.placeholder.com/49x35/F3F34E/60FF9F",
  },
  {
    id: 11,
    wallet: {
      web3_token: "0x2fd91ad59af67d7d2ee2e9bd6c565ac3ac798170",
      address: "(web3_token)",
      is_whiteListed: false,
      id: 11,
    },
    nickname: undefined,
    username: "jhackeltona",
    bio: undefined,
    profile_image: "https://via.placeholder.com/724x10/FDFAE4/2F7FB3",
    background_image: "https://via.placeholder.com/096x927/F1F8A8/1E7F7D",
  },
  {
    id: 12,
    wallet: {
      web3_token: "0x184f3123df4f9d6c9dba3cd3531914b4b21586bb",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 12,
    },
    nickname: "srackb",
    username: "kcorpeb",
    bio: "Kerluke, Ebert and O'Hara",
    profile_image: undefined,
    background_image: undefined,
  },
  {
    id: 13,
    wallet: {
      web3_token: "0x4aae72d08f6d86720e51cba00b67449bcf5e4e72",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 13,
    },
    nickname: undefined,
    username: "aleapc",
    bio: undefined,
    profile_image: "https://via.placeholder.com/54x19/FF0321/F0F9FE",
    background_image: "https://via.placeholder.com/703x93/F298E4/2668F3",
  },
  {
    id: 14,
    wallet: {
      web3_token: "0x65f10ef7400a13769ae07613ed9b4f8d1cddc400",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 14,
    },
    nickname: "dlebrund",
    username: "jwhittond",
    bio: undefined,
    profile_image: "https://via.placeholder.com/722x339/3EA4FF/FFF619",
    background_image: "https://via.placeholder.com/038x398/01DFFC/13E08F",
  },
  {
    id: 15,
    wallet: {
      web3_token: "0xa3672c6f211095c722cc8bbb3100ae127bbdea59",
      address: "(web3_token)",
      is_whiteListed: false,
      id: 15,
    },
    nickname: undefined,
    username: "adollinge",
    bio: "McClure Inc",
    profile_image: "https://via.placeholder.com/503x21/9D2D4D/31FFF9",
    background_image: "https://via.placeholder.com/02x97/601FFF/FA40F4",
  },
  {
    id: 16,
    wallet: {
      web3_token: "0x14476a2c32088e727ffe28072f8b3852659bf685",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 16,
    },
    nickname: undefined,
    username: "galanf",
    bio: undefined,
    profile_image: "https://via.placeholder.com/533x997/FA2F4D/E91EEE",
    background_image: "https://via.placeholder.com/60x033/D062D1/39EFF7",
  },
  {
    id: 17,
    wallet: {
      web3_token: "0xab07f04dc52e18a309ae15cc8d233f63e024fc28",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 17,
    },
    nickname: "mgoodlifeg",
    username: "prundallg",
    bio: "Heidenreich, D'Amore and Breitenberg",
    profile_image: "https://via.placeholder.com/717x74/C797D2/D2ECFE",
    background_image: "https://via.placeholder.com/671x63/5E3D58/FEFD1F",
  },
  {
    id: 18,
    wallet: {
      web3_token: "0x1dc5176bcdaa644350ab081e9bb7dfbcf47e9dce",
      address: "(web3_token)",
      is_whiteListed: true,
      id: 18,
    },
    nickname: "cscrivensh",
    username: "dtynanh",
    bio: "Gutkowski LLC",
    profile_image: "https://via.placeholder.com/539x267/F3EF87/F2DFAF",
    background_image: "https://via.placeholder.com/98x99/AF3654/3E2FFF",
  },
  {
    id: 19,
    wallet: {
      web3_token: "0x6705217cf3d06e0cf6dfa5e50ac3a29f2b6b52b9",
      address: "(web3_token)",
      is_whiteListed: false,
      id: 19,
    },
    nickname: "dtroyi",
    username: "pattwelli",
    bio: undefined,
    profile_image: "https://via.placeholder.com/438x46/E3F435/7679F1",
    background_image: "https://via.placeholder.com/931x592/9FFEF4/F1ECFC",
  },
  {
    id: 20,
    wallet: {
      web3_token: "0x416309c02e9adecbc6abbdd2393b52dd3012c8d6",
      address: "(web3_token)",
      is_whiteListed: false,
      id: 20,
    },
    nickname: "bohagertyj",
    username: "rbeerntj",
    bio: "Toy-Will",
    profile_image: "https://via.placeholder.com/162x10/EE027F/59FEE2",
    background_image: "https://via.placeholder.com/960x46/8305EF/1946CF",
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // res.status(200).json({})
}

// asset		{23}
// assetContract		{4}
// collection		{8}
// relayId	:	QXNzZXRUeXBlOjE3Njk2Mw==
// tokenId	:	5204
// backgroundColor	:	undefined
// imageUrl	:	https://lh3.googleusercontent.com/C2wcQysBtOAFHBNWbSbKDeSRNf9hDmmjPRBhoeRAY2RVJZe1G87fNjXpxJUb_zY39vU_zhZirkZD5Tan1WjMiedw
// name	:	CryptoPunk #5204
// id	:	QXNzZXRUeXBlOjE3Njk2Mw==
// isDelisted	:	false
// animationUrl	:	null
// displayImageUrl	:	https://lh3.googleusercontent.com/C2wcQysBtOAFHBNWbSbKDeSRNf9hDmmjPRBhoeRAY2RVJZe1G87fNjXpxJUb_zY39vU_zhZirkZD5Tan1WjMiedw
// decimals	:	null
// favoritesCount	:	39
// isFavorite	:	false
// isFrozen	:	false
// hasUnlockableContent	:	false
// orderData		{2}
// isEditable		{2}
// isListable	:	false
// ownership	:	null
// creator		{2}
// ownedQuantity	:	null
// assetEventData		{1}
// assetBundle	:	null
// __typename	:	SearchResultType
