import NFTCard from "../Gallery/NFTCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import Translate from "../Text/Translate";

interface HomeNFTsProps {
  isBigScreen: boolean;
}

const HomeNFTs: React.FC<HomeNFTsProps> = ({ isBigScreen }) => {
  return (
    <section className="py-6">
      <div className="container">
        <h2 className="title has-text-centered mb-6">
          <Translate keyword="highlighted" />
        </h2>
        {isBigScreen ? (
          <div className="columns">
            <div className="column">
              <NFTCard
                collectionName="Maymun"
                nftName="maymun500"
                owner="maymuncu"
                price="0.001"
              />
            </div>
            <div className="column">
              <NFTCard
                collectionName="Maymun"
                nftName="maymun500"
                owner="maymuncu"
                price="0.001"
              />
            </div>
            <div className="column">
              <NFTCard
                collectionName="Maymun"
                nftName="maymun500"
                owner="maymuncu"
                price="0.001"
              />
            </div>
            <div className="column">
              <NFTCard
                collectionName="Maymun"
                nftName="maymun500"
                owner="maymuncu"
                price="0.001"
              />
            </div>
          </div>
        ) : (
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <NFTCard
                collectionName="Maymun"
                nftName="maymun500"
                owner="maymuncu"
                price="0.001"
              />
            </SwiperSlide>
            <SwiperSlide>
              <NFTCard
                collectionName="Maymun"
                nftName="maymun500"
                owner="maymuncu"
                price="0.001"
              />
            </SwiperSlide>
            <SwiperSlide>
              <NFTCard
                collectionName="Maymun"
                nftName="maymun500"
                owner="maymuncu"
                price="0.001"
              />
            </SwiperSlide>
            <SwiperSlide>
              <NFTCard
                collectionName="Maymun"
                nftName="maymun500"
                owner="maymuncu"
                price="0.001"
              />
            </SwiperSlide>
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default HomeNFTs;
