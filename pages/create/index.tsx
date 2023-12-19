import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import MainTitle from "../../components/Text/MainTitle";
import Translate from "../../components/Text/Translate";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  return (
    <section className="container content py-6" style={{ maxWidth: "720px" }}>
      <MainTitle>
        <Translate keyword="choose_type" />
      </MainTitle>
      <p className="is-size-5">
        <Translate keyword="choose_type_description" />
      </p>
      <div className="columns is-mobile">
        <div className="column">
          <Link href="/create/single">
            <a className="box is-flex is-flex-direction-column is-align-items-center	">
              <h1>
                <Translate keyword="single" />
              </h1>
              <FontAwesomeIcon icon={faCompass} size={"4x"} />
              <p className="has-text-grey mt-5">
                <Translate keyword="single_description" />
              </p>
            </a>
          </Link>
        </div>
        <div className="column">
          <Link href="/create/multiple">
            <a className="box is-flex is-flex-direction-column is-align-items-center	">
              <h1>
                <Translate keyword="multiple" />
              </h1>
              <FontAwesomeIcon icon={faCompass} size={"4x"} />
              <p className="has-text-grey mt-5">
                <Translate keyword="single_description" />
              </p>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Create;
