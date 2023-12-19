import Link from "next/link";
import Translate from "../Text/Translate";
import HomeCard from "./HomeCard";

interface ExploreCreateProps {
  isBigScreen: boolean;
}

const ExploreCreate: React.FC<ExploreCreateProps> = ({ isBigScreen }) => {
  return (
    <section className="container py-6">
      <div className="columns is-flex is-vcentered is-multiline">
        <div
          className={
            isBigScreen ? "column is-full-mobile pr-7" : "column is-full-mobile"
          }
        >
          <div className="content is-medium">
            <h1 className="title">
              <Translate keyword="discover" />
            </h1>
            <p className="has-text-black mb-6 mt-3">
              <Translate keyword="discover_content" />
            </p>
          </div>
          <div className="columns is-mobile">
            <div className="column">
              <Link href="/assets">
                <a className="button is-large has-black-border is-fullwidth">
                  <Translate keyword="explore" />
                </a>
              </Link>
            </div>
            <div className="column">
              <Link href="/create">
                <a className="button is-large is-black is-fullwidth">
                  <Translate keyword="create" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="column">
          <HomeCard />
        </div>
      </div>
    </section>
  );
};

export default ExploreCreate;
