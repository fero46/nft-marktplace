import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Gallery, { filterProps } from "../../components/Gallery/Gallery";
import { FilterProps } from "../../components/Filter/AssetsFilter";
import AboutProfile from "../../components/Profile/AboutProfile";
import ProfileBanner from "../../components/Profile/ProfileBanner";
import {
  faInfinity,
  faShare,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import ButtonGroupAddons from "../../components/Buttons/ButtonGroupAddons";
import { isBlockId } from "../../hooks/helperFunctions";
import Addon from "../../components/Buttons/Addon";
import { useTranslate } from "../../components/Text/Translate";
import { useActiveWeb3React } from "../../hooks/web3";

interface UserProps {
  isClient: boolean;
  //needs more props

  hiddenQuery: string;
  filterProps: FilterProps;
  sortQuery: string[];
  typeQuery: string[];
}

const User: React.FC<UserProps> = ({
  isClient,
  hiddenQuery,
  filterProps,
  sortQuery,
  typeQuery,
}) => {
  const router = useRouter();
  const { account, active } = useActiveWeb3React();

  const [activeTab, setActiveTab] = useState<"owned" | "collections" | "nfts">(
    "owned"
  );

  useEffect(() => {
    console.log(router);
  }, [router]);

  const settings = useTranslate("settings");
  const share = useTranslate("share");

  return (
    <>
      <ProfileBanner
        href="https://via.placeholder.com/1920x720"
        editable={isClient && active}
      >
        <ButtonGroupAddons>
          <Addon
            icon={faShare}
            tooltipText={settings}
            button={{ action: () => void 0 }}
          />
          {isClient && active && (
            <Addon
              icon={faWrench}
              tooltipText={settings}
              link={{ linkHref: "/settings" }}
            />
          )}
        </ButtonGroupAddons>
      </ProfileBanner>
      <AboutProfile account="0x124214125" editable={isClient && active} />
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
            hiddenQuery={hiddenQuery}
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

export default User;

export async function getServerSideProps({ query, route }: any) {
  const user = query.user;
  let client = false;
  //search for user here
  switch (user) {
    case "you":
      client = true;
      // search with account id
      break;
    case isBlockId(user):
      // client = user == account.id
      // search with id
      break;
    default:
      // client = user === account.username
      // search with name
      break;
  }

  return {
    props: {
      isClient: client,
      // hiddenQuery: hiddenQuery,
      filterProps: filterProps(query),
      sortQuery: query.sort ? query.sort : [],
      typeQuery: query.type ? query.type : [],
    },
  };
}
