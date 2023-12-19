import {
  faAlignLeft,
  faLevelUpAlt,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import CreateTool from "../../components/CreateTool/CreateTool";
import FakeCollapsible from "../../components/Buttons/FakeCollapsible";
import Form from "../../components/Form";

import MediaUploader from "../../components/Form/MediaUploader";
import { maymunlar2, maymunlar3 } from "../../utils/collectionsTemplate";
import {
  CollectionProps,
  NFTPropertyProps,
  NFTStatLevelProps,
} from "../../utils/types";
import { lazy_mint } from "../../external_api/nfts";
import { toast } from "react-toastify";
import { LazyMinter } from "../../utils/LazyMinter";
import { useActiveWeb3React, useWalletAuth } from "../../hooks/web3";
import { getSigner } from "../../utils";
import Translate, { useTranslate } from "../../components/Text/Translate";
import LoadingButton from "../../components/Buttons/LoadingButton";
import ConnectWalletMenu from "../../components/Layout/ConnectWalletMenu";
import CreateCollection from "../../components/CreateTool/CreateCollection";
import RequiredFields from "../../components/Form/RequiredFields";
import CollectionBox from "../../components/CreateTool/CollectionBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, SwiperOptions } from "swiper";
import TextInput from "../../components/Form/TextInput";
import { Swiper as SwiperClass } from "swiper/types/swiper-class";
import { GetStaticProps } from "next";
import { useMediaQuery } from "react-responsive";
import CollectionCard from "../../components/Gallery/CollectionCard";
import { osman } from "../../utils/usersTemplate";
import ButtonWrapper from "../../components/Buttons/ButtonWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface CreateProps {
  mintType: "single" | "multiple";
}

interface TraitProps {
  trait: {
    name: string;
    value_type: "PROPERTIES" | "STATS" | "LEVELS";
  };
  value: string;
}

const acceptedNftUploads = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/bmp",
  "video/mp4",
  "video/m4v",
  "video/avi",
  "video/mpg",
  "audio/mp3",
];

const defaultCollection: CollectionProps = {
  name: "Red Meduse NFT",
  symbol: "RM",
  imageSrc: "https://via.placeholder.com/60x60",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, porro. Rerum, odio qui. Ipsa, rem. At illo error cumque! Ipsam nostrum maxime fugiat eaque vel pariatur enim optio illo magni iusto cum in, ducimus natus iure perspiciatis reiciendis laboriosam! Fugiat vel nisi excepturi dignissimos dolorum? Eum distinctio exercitationem ratione dolorum.",
};

const Create: React.FC<CreateProps> = ({ mintType }) => {
  const [file, setFile] = useState<File>();
  const [fileType, setFileType] = useState<string>();

  const [name, setName] = useState<string>();
  const namePlaceholder = useTranslate("name_placeholder");

  const [external, setExternal] = useState<string>();

  const [description, setDescription] = useState<string>();

  const [collection, setCollection] =
    useState<CollectionProps>(defaultCollection);

  const [properties, setProperties] = useState<NFTPropertyProps[]>([]);
  const [levels, setLevels] = useState<NFTStatLevelProps[]>([]);
  const [stats, setStats] = useState<NFTStatLevelProps[]>([]);

  const [royalties, setRoyalties] = useState<string>("10");
  const [royaltiesError, setRoyaltiesError] = useState<string>();
  const maxRoyaltyError = useTranslate("royalties_error");

  const [copies, setCopies] = useState<string | undefined>(
    mintType === "single" ? "1" : "10"
  );
  const [copiesError, setCopiesError] = useState<string>();
  const maxCopyError = useTranslate("number_of_copies_error");

  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

  const [selectedModal, setSelectedModal] = useState<
    "properties" | "levels" | "stats" | undefined
  >(undefined);

  const [showCollectionModal, setShowCollectionModal] =
    useState<boolean>(false);

  const [collectionList, setCollectionList] = useState<CollectionProps[]>([]);

  const [swiper, setSwiper] = useState<SwiperClass>();

  //had to be done :/
  const [useEffectFlag, setUseEffectFlag] = useState<boolean>(false);

  const [big, setBig] = useState<boolean>(false);
  const isBigScreen = useMediaQuery({ query: "(min-width: 900px)" });
  useEffect(() => {
    setBig(isBigScreen);
  }, [isBigScreen]);

  const { library, account, chainId } = useActiveWeb3React();

  const requiredError = useTranslate("required_error");

  const handleRoyalties = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = e.currentTarget.value;
    if (!temp) setRoyaltiesError(requiredError);
    else if (parseInt(temp) > 50) setRoyaltiesError(maxRoyaltyError);
    else setRoyaltiesError(undefined);

    setRoyalties(temp);
  };

  const handleCopies = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = e.currentTarget.value;
    if (!temp) setCopiesError(requiredError);
    else if (parseInt(temp) > 100) setCopiesError(maxCopyError);
    else setCopiesError(undefined);

    setCopies(temp);
  };

  const handleModalOpen = (
    name: "properties" | "levels" | "stats" | undefined
  ) => {
    setSelectedModal(name);
  };

  const handleSubmit = async () => {
    setWaitingResponse(true);
    let traits: TraitProps[] = [];

    if (properties.length) {
      let temp: TraitProps[] = properties.map((p) => {
        return {
          trait: {
            name: p.tag,
            value_type: "PROPERTIES",
          },
          value: p.value,
        };
      });
      traits = [...traits, ...temp];
    }

    if (levels.length) {
      let temp: TraitProps[] = levels.map((p) => {
        return {
          trait: {
            name: p.name,
            value_type: "LEVELS",
          },
          value: p.value + "/" + p.outOf,
        };
      });
      traits = [...traits, ...temp];
    }

    if (stats.length) {
      let temp: TraitProps[] = stats.map((p) => {
        return {
          trait: {
            name: p.name,
            value_type: "STATS",
          },
          value: p.value + "/" + p.outOf,
        };
      });
      traits = [...traits, ...temp];
    }

    const lazyMinter = new LazyMinter(
      "0x3772AA95dEF7DF7573763F73dE8B570eE1FC57C5",
      getSigner(library, account),
      chainId
    );

    const { voucher, signature } = await lazyMinter.createVoucher(
      account,
      0,
      file?.name,
      5
    );
    console.log(file);
    const fileToBlob = async (file: any) =>
      new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
    const blob = await fileToBlob(file);
    const req = {
      name: name,
      collection: "0x22E760Eb94Ff630bB00FFcb924809e7c99371C82".toLowerCase(),
      image_url: blob,
      asset_type: fileType,
      external: external,
      description: description,
      traits: traits,
      signature: signature,
      chainId: chainId,
      signer: account,
      price: 0,
    };
    const formdata = new FormData();

    formdata.append("name", name!);
    formdata.append(
      "collection",
      "0x22E760Eb94Ff630bB00FFcb924809e7c99371C82".toLowerCase()
    );
    formdata.append("image_url", blob, file!.name);
    formdata.append("traits", JSON.stringify(traits));
    formdata.append("signature", signature);
    formdata.append("signer", account!);
    formdata.append("description", description!);

    console.log(formdata);
    const response = await lazy_mint(formdata);
    if (response == 200) {
      toast.success("NFT succesfully minted");
    } else {
      toast.error("Some error happened");
    }
    setWaitingResponse(false);
  };

  //fetch user collections
  useEffect(() => {
    setCollectionList([maymunlar2, maymunlar3]);
  }, []);

  //triggered after creating a collection
  //close modal, select new collection and adjust slider
  //enabled after rendering create collection modal
  useEffect(() => {
    if (useEffectFlag) {
      setShowCollectionModal(false);
      setCollection(collectionList[collectionList.length - 1]);
      if (swiper) swiper.slideTo(collectionList.length - 1);
    }
  }, [collectionList]);

  return account ? (
    <section className="container content py-6" style={{ maxWidth: "720px" }}>
      <h1 className="is-title is-size-1">
        <Translate keyword="create_new_item" />
      </h1>

      <RequiredFields />

      <Form
        label="create_extension"
        required={true}
        description="create_extension_description"
      >
        <MediaUploader
          fileSetter={setFile}
          typeSetter={setFileType}
          acceptedTypes={acceptedNftUploads}
        />
      </Form>

      <Form label="name" required={true}>
        <TextInput
          placeholder={namePlaceholder}
          getter={name}
          setter={setName}
          required
        />
      </Form>

      <Form label="external_link" description="external_link_description">
        <TextInput
          placeholder="www.yoursite.com"
          getter={external}
          setter={setExternal}
        />
      </Form>

      <Form label="royalties" required description="royalties_description">
        <input
          className={clsx("input", royaltiesError && "is-danger")}
          type="number"
          placeholder="10%"
          onChange={handleRoyalties}
          value={royalties}
        />
        {royaltiesError && (
          <small className="has-text-danger">{royaltiesError}</small>
        )}
      </Form>

      {mintType === "multiple" && (
        <Form label="number_of_copies" required>
          <input
            className={clsx("input", copiesError && "is-danger")}
            type="number"
            placeholder="10"
            onChange={handleCopies}
            value={copies}
          />
          {copiesError && (
            <small className="has-text-danger">{copiesError}</small>
          )}
        </Form>
      )}

      <Form label="description" description="description_description">
        <textarea
          className="textarea"
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
        ></textarea>
      </Form>

      <Form label="loyalties"></Form>

      <Form label="collection" description="collection_description">
        <Swiper
          // @ts-ignore
          onSwiper={(s) => setSwiper(s)}
          spaceBetween={16}
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          slidesPerView={big ? 2 : 1}
          className="p-3"
        >
          <SwiperSlide>
            {/* <CollectionBox
              name="Add"
              short={mintType === "single" ? "ERC-191" : "ERC-1155"}
              onClick={() => {
                setUseEffectFlag(true);
                setShowCollectionModal(true);
              }}
            /> */}
            <div
              className="create-collection"
              onClick={() => {
                setUseEffectFlag(true);
                setShowCollectionModal(true);
              }}
            >
              <FontAwesomeIcon icon={faPlusCircle} size="4x" className="mb-5" />
              <p className="has-text-grey px-3 has-text-centered content is-medium">
                Create a collection with <b>ERC-191</b> contract
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <ButtonWrapper
              onClick={() => setCollection(defaultCollection)}
              className="box p-0"
              selected={collection.name == defaultCollection.name}
            >
              <CollectionCard
                bannerHref={defaultCollection.imageSrc}
                imageHref={defaultCollection.imageSrc}
                name={defaultCollection.name}
                description={defaultCollection.description}
                creator={osman}
              />
            </ButtonWrapper>
          </SwiperSlide>
          {collectionList.map((c, i) => (
            <SwiperSlide key={i}>
              <ButtonWrapper
                onClick={() => setCollection(c)}
                className="box p-0"
                selected={collection.name == c.name}
              >
                <CollectionCard
                  bannerHref={c.imageSrc}
                  imageHref={c.imageSrc}
                  name={c.name}
                  description={c.description}
                  creator={c.createdBy ? c.createdBy : osman}
                />
              </ButtonWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Form>

      <FakeCollapsible
        title="properties"
        description="properties_description"
        isButton={true}
        icon={faAlignLeft}
        callback={() => handleModalOpen("properties")}
        translate
      />
      <FakeCollapsible
        title="levels"
        description="levels_description"
        isButton={true}
        icon={faLevelUpAlt}
        callback={() => handleModalOpen("levels")}
        translate
      />
      <FakeCollapsible
        title="stats"
        description="stats_description"
        isButton={true}
        icon={faChartBar}
        callback={() => handleModalOpen("stats")}
        translate
      />

      {selectedModal && (
        <Modal
          show={selectedModal ? true : false}
          setShow={() => setSelectedModal(undefined)}
        >
          {selectedModal === "properties" && (
            <CreateTool
              type={selectedModal}
              list={properties}
              setter={setProperties}
              modalSetter={() => setSelectedModal(undefined)}
            />
          )}
          {selectedModal === "levels" && (
            <CreateTool
              type={selectedModal}
              list={levels}
              setter={setLevels}
              modalSetter={() => setSelectedModal(undefined)}
            />
          )}
          {selectedModal === "stats" && (
            <CreateTool
              type={selectedModal}
              list={stats}
              setter={setStats}
              modalSetter={() => setSelectedModal(undefined)}
            />
          )}
        </Modal>
      )}

      {showCollectionModal && (
        <Modal show={true} setShow={setShowCollectionModal}>
          <CreateCollection setter={setCollectionList} />
        </Modal>
      )}

      <LoadingButton
        onClick={handleSubmit}
        className="button is-info is-fullwidth"
        disabled={
          !file ||
          !name ||
          (royaltiesError ? true : false) ||
          !royalties ||
          !copies ||
          (copiesError ? true : false)
        }
        loading={waitingResponse}
      >
        Create NFT
      </LoadingButton>
    </section>
  ) : (
    <section className="container py-6" style={{ maxWidth: "720px" }}>
      <ConnectWalletMenu big={true} />
    </section>
  );
};

export async function getStaticPaths({ locales }: any) {
  const pages = ["single", "multiple"];

  // create paths
  const paths = locales.reduce(
    (acc: any, next: any) => [
      ...acc,
      ...pages.map((single_multiple) => ({
        params: {
          single_multiple: single_multiple,
        },
        locale: next,
      })),
    ],
    []
  );

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const mintType = params.single_multiple;
    if (mintType === "single" || mintType === "multiple") {
      return {
        props: {
          mintType: mintType,
        },
      };
    }
  }
  return {
    notFound: true,
  };
};

export default Create;
