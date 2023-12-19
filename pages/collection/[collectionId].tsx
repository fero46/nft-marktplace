import { useEffect, useState } from "react";
import Image from "next/image";
import CopyDataButton from "../../components/Buttons/CopyDataButton";
import clsx from "clsx";
import Gallery from "../../components/Gallery/Gallery";
import { FilterProps } from "../../components/Filter/AssetsFilter";
import AboutProfile from "../../components/Profile/AboutProfile";
import { useRouter } from "next/router";
import CollectionProfile from "../../components/Profile/CollectionProfile";
import ProfileBanner from "../../components/Profile/ProfileBanner";
import ProfilePicture from "../../components/Profile/ProfilePicture";

interface CollectionProps {
  searchType?: "CollectionName" | "tokenId";
  filterProps: FilterProps;
  sortQuery: string[];
  typeQuery: string[];
}

const Collection: React.FC<CollectionProps> = ({
  searchType,
  filterProps,
  sortQuery,
  typeQuery,
}) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"owned" | "collections" | "nfts">(
    "owned"
  );

  //call api on router change, get wanted stuff looking at CollectionName or tokenId
  useEffect(() => {}, [router]);

  return (
    <>
      <ProfileBanner href="https://via.placeholder.com/1920x720" />
      <CollectionProfile collection="0x124214125" />
      <section>
        <div className="tabs is-centered is-large mb-0">
          <ul>
            <li className={clsx(activeTab === "owned" && "is-active")}>
              <a onClick={() => setActiveTab("owned")}>Owned NFTS</a>
            </li>
            <li className={clsx(activeTab === "collections" && "is-active")}>
              <a onClick={() => setActiveTab("collections")}>
                Created Collections
              </a>
            </li>
            <li className={clsx(activeTab === "nfts" && "is-active")}>
              <a onClick={() => setActiveTab("nfts")}>Created NFTs</a>
            </li>
          </ul>
        </div>
        {activeTab === "owned" && (
          <Gallery
            filterProps={filterProps}
            sortQuery={sortQuery}
            typeQuery={typeQuery}
            initialHide={true}
          />
        )}
      </section>
    </>
  );
};

export default Collection;

export async function getServerSideProps({ query, route }: any) {
  return {
    props: {
      filterProps: {
        status: query.status ? query.status : [],
        collection: query.collection ? query.collection : [],
        price: {
          currencyName: query.currency ? [query.currency] : [],
          min: query.min ? [query.min] : [],
          max: query.max ? [query.max] : [],
        },
        chains: query.chains ? query.chains : [],
        category: query.category ? [query.category] : [],
        onSaleIn: query.onSaleIn ? query.onSaleIn : [],
      },
      sortQuery: query.sort ? query.sort : [],
      typeQuery: query.type ? query.type : [],
    },
  };
}
