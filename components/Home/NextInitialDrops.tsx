import Image from "next/image";
import InitialCard from "./InitialCard";

interface NextInitialDropsProps {
  isBigScreen: boolean;
}

const NextInitialDrops: React.FC<NextInitialDropsProps> = ({ isBigScreen }) => {
  return (
    <section className="py-6">
      <div className="container">
        <h2 className="title has-text-centered">NEXT INITIAL DROPS</h2>
        {isBigScreen ? (
          <div className="columns is-variable is-8">
            <div className="column">
              <InitialCard cardColor="orange" />
            </div>
            <div className="column">
              <InitialCard cardColor="pink" />
            </div>
            <div className="column">
              <InitialCard cardColor="blue" />
            </div>
          </div>
        ) : (
          <></>
          // <Slider {...sliderSettings}>
          //   <div className="px-3">
          //     <InitialCard cardColor="orange" />
          //   </div>
          //   <div className="px-3">
          //     <InitialCard cardColor="pink" />
          //   </div>
          //   <div className="px-3">
          //     <InitialCard cardColor="blue" />
          //   </div>
          // </Slider>
        )}
      </div>
    </section>
  );
};

export default NextInitialDrops;
