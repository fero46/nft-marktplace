import Image from "next/image";
import { useEffect, useState } from "react";
const bodyScrollLock = require("body-scroll-lock");

import MobileButton from "../Buttons/MobileButton";

import categoryList from "../../utils/categories";

import logo from "../../public/meduse-nft.png";
import {
  faBars,
  faWallet,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUserCircle,
  faChartBar,
  faCompass,
  faBookmark,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import { useMediaQuery } from "react-responsive";
import Modal from "../Modal";
import ConnectWalletMenu from "./ConnectWalletMenu";
import { useActiveWeb3React } from "../../hooks/web3";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import WalletButton from "./WalletButton";
import clsx from "clsx";
import ShowWalletMenu from "./ShowWalletMenu";
import Translate, { useTranslate } from "../Text/Translate";
import ProfileButton from "./ProfileButton";

export interface MenuProps {
  title: string;
  icon: IconDefinition;
  href: string;
  submenu?: SubmenuProps[];
}
export interface SubmenuProps {
  title: string;
  href: string;
  icon?: IconDefinition;
}

const navs: MenuProps[] = [
  {
    title: "explore",
    icon: faCompass,
    href: "/assets",
    submenu: categoryList,
  },
  {
    title: "explore",
    href: "/stats",
    icon: faBars,
    submenu: [
      {
        title: "Rankings",
        href: "/stats/rankings",
        icon: faCompass,
      },
      {
        title: "Activity",
        href: "/stats/activity",
        icon: faCompass,
      },
    ],
  },
  {
    title: "explore",
    href: "/resources",
    icon: faBookmark,
    submenu: [
      {
        title: "Help Center",
        href: "/resources/help-center",
        icon: faCompass,
      },
      {
        title: "Platform Status",
        href: "/resources/platform-status",
        icon: faCompass,
      },
      {
        title: "Partners",
        href: "/resources/partners",
        icon: faCompass,
      },
      {
        title: "Gas-Free Marketplace",
        href: "/resources/gas-free-marketplace",
        icon: faCompass,
      },
      {
        title: "Blog",
        href: "/resources/blog",
        icon: faCompass,
      },
      {
        title: "Docs",
        href: "/resources/docs",
        icon: faCompass,
      },
      {
        title: "Newsletter",
        href: "/resources/newsletter",
        icon: faCompass,
      },
    ],
  },
  {
    title: "create",
    href: "/create",
    icon: faCompass,
  },
];

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuProps | undefined>();
  const [walletShow, setWalletShow] = useState(false);

  const [big, setBig] = useState<boolean>(false);

  const [walletConnect, setWalletConnect] = useState<boolean>(false);

  const [walletType, setWalletType] = useState<
    "MetaMask" | "TrustWallet" | "WalletConnect" | undefined
  >(undefined);
  const { account, active } = useActiveWeb3React();

  const disableBodyScroll = bodyScrollLock.disableBodyScroll;
  const enableBodyScroll = bodyScrollLock.enableBodyScroll;

  const router = useRouter();

  const isBigScreen = useMediaQuery({ query: "(min-width: 900px)" });

  //translations :)
  const cwf = useTranslate("connect_wallet_first");

  //close modal after injection or ejection
  useEffect(() => {
    if (active && walletConnect) {
      setWalletConnect(false);
      toast.success("Wallet connected!");
    } else if (!active && walletShow) {
      setWalletShow(false);
      toast.warning("Wallet disconnected!");
    }
  }, [active]);

  //close menu on new page
  useEffect(() => {
    if (showMobile) {
      setShowMobile(false);
      enableBodyScroll(document.body);
    }
  }, [router]);

  useEffect(() => {
    //has small bugs
    if (showMobile || walletShow) disableBodyScroll(document.body);
    else enableBodyScroll(document.body);
  }, [showMobile, walletShow]);

  useEffect(() => {
    setBig(isBigScreen);
  }, [isBigScreen]);

  //close mobile menu if the screen is "big"
  useEffect(() => {
    if (big && showMobile) {
      enableBodyScroll(document.body);
      setShowMobile(false);
      setSelectedMenu(undefined);
    }
    if (big && walletShow) {
      enableBodyScroll(document.body);
    }
  }, [big]);

  const connectWalletFirst = () => {
    toast.warning(cwf);
    setWalletConnect(true);
  };

  const closeEverything = () => {
    setWalletShow(false);
    setWalletConnect(false);
  };

  return (
    <>
      <nav
        className="navbar is-black is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link href="/" passHref>
              <a className="navbar-item">
                <Image src={logo} width="112" height="28" alt="Site Logo" />
              </a>
            </Link>

            <button
              onClick={() => setShowMobile((prev) => !prev)}
              role="button"
              className={
                showMobile ? "navbar-burger is-active" : "navbar-burger"
              }
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link href="/">
                <a
                  className={clsx(
                    "navbar-item",
                    router.pathname === "/" && "new-active"
                  )}
                >
                  <Translate keyword="home" />
                </a>
              </Link>
              {/* <Link href={}>
                <a className="navbar-item">Collection</a>
              </Link> */}
              <Link href="/assets">
                <a
                  className={clsx(
                    "navbar-item",
                    router.pathname === "/assets" && "new-active"
                  )}
                >
                  <Translate keyword="explore" />
                </a>
              </Link>
              {/* <Link href={}>
                <a className="navbar-item">Initial Drops</a>
              </Link> */}
            </div>

            <div className="navbar-end">
              {active ? (
                <Link href="/create">
                  <a
                    className={clsx(
                      "navbar-item",
                      router.pathname === "/create" && "new-active"
                    )}
                  >
                    <Translate keyword="create" />
                  </a>
                </Link>
              ) : (
                <button
                  className="navbar-item button is-black is-radiusless my-auto py-5"
                  onClick={connectWalletFirst}
                >
                  <Translate keyword="create" />
                </button>
              )}

              <a className="navbar-item" href="https://meduse.io/">
                Meduse
              </a>
              <ProfileButton
                account={account}
                routerAsPath={router.asPath}
                connectWalletFirst={connectWalletFirst}
              />
              <WalletButton
                account={account}
                setWalletConnect={setWalletConnect}
                setWalletShow={setWalletShow}
                open={walletConnect || walletShow}
              />
            </div>
          </div>
        </div>
        <aside
          className={clsx(
            "mobile-menu right",
            showMobile ? "active" : "passive"
          )}
        >
          <div className="is-flex is-flex-direction-column is-justify-content-space-between is-fullheight">
            <div>
              {selectedMenu?.submenu ? (
                <>
                  <MobileButton
                    title={selectedMenu.title}
                    icon={faAngleLeft}
                    hasSubmenu={true}
                    back={true}
                    translate={true}
                    setter={(e: any) => setSelectedMenu(undefined)}
                  />
                  {selectedMenu.submenu.map((n, key) => (
                    <MobileButton
                      title={n.title}
                      icon={n.icon}
                      hasSubmenu={false}
                      href={n.href}
                      translate={true}
                      key={key}
                    />
                  ))}
                </>
              ) : (
                navs.map((n, key) => (
                  <MobileButton
                    title={n.title}
                    icon={n.icon}
                    hasSubmenu={n.submenu ? true : false}
                    href={n.href}
                    key={key}
                    translate={true}
                    setter={(e: any) => setSelectedMenu(n)}
                  />
                ))
              )}
            </div>

            {showMobile && (
              <div className="px-5 mb-5">
                <button
                  className="button is-fullwidth is-info is-large"
                  onClick={() => {
                    active ? setWalletShow(true) : setWalletConnect(true);
                    setShowMobile(false);
                  }}
                >
                  {active ? "Show Wallet" : "Connect Wallet"}
                </button>
                )
              </div>
            )}
          </div>
        </aside>
      </nav>

      <aside
        className={clsx(
          big
            ? ["panel fixed right", !walletShow && !walletConnect && "none"]
            : "mobile-menu right",
          walletShow || walletConnect ? "active" : "passive"
        )}
      >
        {walletShow && active && (
          <ShowWalletMenu
            account={account}
            injector="MetaMask"
            big={big}
            setShow={setWalletShow}
          />
        )}
        {walletConnect && !active && (
          <ConnectWalletMenu big={big} setShow={setWalletConnect} />
        )}
      </aside>

      {/* show "overlay" when there is a menu */}
      {(walletConnect || walletShow) && big && (
        <div className="page-overlay" onClick={closeEverything}></div>
      )}
    </>
  );
};

export default Navbar;
