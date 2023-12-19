import Image from "next/image";

interface HomeCardProps {}

const HomeCard: React.FC<HomeCardProps> = () => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-16by9">
          <Image
            src="https://via.placeholder.com/1600x900"
            alt="Placeholder image"
            layout="fill"
          />
        </figure>
      </div>
      <div className="card-content pb-2 pt-2">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <Image
                className="is-rounded"
                src="https://via.placeholder.com/60x60"
                alt="Placeholder image"
                layout="fill"
              />
            </figure>
          </div>
          <div className="media-content my-auto">
            <p className="title is-6 mb-0">The Umbrella Suits</p>
            <a className="title is-6 has-text-link">Georg From the Djungle</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
