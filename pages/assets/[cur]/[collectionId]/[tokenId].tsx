import AssetCard from "../../../../components/Details/AssetCard";
import AssetsAddons from "../../../../components/Details/AssetsAddons";
import {
  OwnerCreatorProps,
  NFTDetailsProps,
  NFTPropertyProps,
  ReferenceProps,
  CollectionProps,
  PriceProps,
  NFTStatLevelProps,
} from "../../../../utils/types";
import CollectionBy from "../../../../components/Text/CollectionBy";
import CreatedOwnedBy from "../../../../components/Text/CreatedOwnedBy";
import Properties from "../../../../components/Details/Properties";

import Description from "../../../../components/Details/Description";
import FavoritesButton from "../../../../components/Buttons/FavoritesButton";

import {
  faAlignLeft,
  faInfoCircle,
  faEthernet,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import About from "../../../../components/Details/About";
import Details from "../../../../components/Details/Details";
import Sale from "../../../../components/Details/Sale";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { etherium } from "../../../../utils/currencies";
import Levels from "../../../../components/Details/Levels";

const ReactDOMServer = require("react-dom/server");
const HtmlToReactParser = require("html-to-react").Parser;

interface AssetProps {
  //have to get those from getserversideprops
  nftName: string;
  favoriteCount: number;
  isFavorited: boolean;
  descriptionHTML: string; //in markup
  aboutHTML: string;
  details: NFTDetailsProps;
  createdBy: OwnerCreatorProps;
  ownedBy: OwnerCreatorProps;
  properties?: NFTPropertyProps[];
  levels?: NFTStatLevelProps[];
  references?: ReferenceProps[];
  collection?: CollectionProps;
  currentPrice: PriceProps;
}

const Asset: React.FC<AssetProps> = ({
  nftName,
  favoriteCount,
  isFavorited,
  descriptionHTML,
  aboutHTML,
  details,
  createdBy,
  ownedBy,
  properties,
  levels,
  references,
  collection,
  currentPrice,
}) => {
  const htmlToReactParser = new HtmlToReactParser();
  const description = htmlToReactParser.parse(descriptionHTML);
  const about = htmlToReactParser.parse(aboutHTML);

  const aboutTitle = "About " + nftName;

  return (
    <section className="pt-5 pb-5">
      <div className="container">
        <div className="columns">
          <div className="column is-two-fifths">
            <AssetCard
              favoriteCount={favoriteCount}
              isFavorited={isFavorited}
            />
            <div className="card">
              <Description description={description} createdBy={createdBy} />
              {properties && <Properties properties={properties} />}
              {levels && <Levels levels={levels} />}
              <About nftName={nftName} about={about} references={references} />
              <Details details={details} />
            </div>
          </div>
          <div className="column">
            <div className="content">
              <div className="is-flex is-justify-content-space-between">
                {collection ? (
                  <CollectionBy collection={collection} />
                ) : (
                  <div></div>
                )}
                <AssetsAddons />
              </div>
              <h1 className="title mt-0">{nftName}</h1>
              <div className="is-flex mb-5">
                <CreatedOwnedBy creatorOwner={ownedBy} isCreated={false} />
                <FavoritesButton favoriteCount={favoriteCount} />
              </div>
              <Sale endDate={new Date()} currentPrice={currentPrice} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps() {
  const props: AssetProps = {
    nftName: "maymun",
    favoriteCount: 30,
    isFavorited: true,
    descriptionHTML:
      "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, tempore architecto explicabo voluptatibus reprehenderit delectus, nam sequi distinctio perspiciatis ea dolorem. Eius quidem, quod, laudantium pariatur praesentium iste minus modi est excepturi quas dolorem quisquam nihil voluptate velit sunt amet!</p>",
    aboutHTML:
      "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, tempore architecto explicabo voluptatibus reprehenderit delectus, nam sequi distinctio perspiciatis ea dolorem. Eius quidem, quod, laudantium pariatur praesentium iste minus modi est excepturi quas dolorem quisquam nihil voluptate velit sunt amet!</p>",
    details: {
      address: "0x86357A19E5537A8Fba9A004E555713BC943a66C0",
      tokenID: "123124125125",
      tokenStandard: "ut431",
      blockChain: "etherium",
    },
    createdBy: {
      name: "Osman",
      wallet: "123455235xcasfsdf",
      isVerified: true,
    },
    ownedBy: {
      name: "Osman",
      wallet: "123455235xcasfsdf",
      isVerified: true,
    },
    properties: [
      {
        tag: "kafa",
        value: "sarı",
        rarity: 99,
      },
      {
        tag: "kafa",
        value: "sarı",
        rarity: 99,
      },
      {
        tag: "kafa",
        value: "sarı",
        rarity: 99,
      },
      {
        tag: "kafa",
        value: "sarı",
        rarity: 99,
      },
      {
        tag: "kafa",
        value: "sarı",
        rarity: 99,
      },
      {
        tag: "kafa",
        value: "sarı",
        rarity: 99,
      },
    ],
    levels: [
      {
        name: "speed",
        value: "100",
        outOf: "100",
      },
      {
        name: "violence",
        value: "100",
        outOf: "100",
      },
      {
        name: "momentum",
        value: "100",
        outOf: "100",
      },
    ],
    references: [
      {
        href: "twitter.com",
        platform: "Twitter",
      },
      {
        href: "facebook.com",
        platform: "Facebook",
      },
    ],
    currentPrice: {
      currency: etherium,
      ammount: 0.001,
    },
    collection: {
      name: "Maymun Koleksiyonu",
      createdBy: {
        name: "Osman",
        wallet: "123455235xcasfsdf",
        isVerified: true,
      },
      isVerified: true,
    },
  };

  return { props: props };
}

export default Asset;
