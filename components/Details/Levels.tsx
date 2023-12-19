import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { NFTStatLevelProps } from "../../utils/types";
import Collapsible from "../Buttons/Collapsible";

interface LevelsProps {
  levels: NFTStatLevelProps[];
}

const Levels: React.FC<LevelsProps> = ({ levels }) => {
  return (
    <Collapsible title="levels" icon={faInfoCircle} translate>
      <ul>
        {levels.map((l, i) => (
          <li key={i}>
            <div className="is-flex is-justify-content-space-between has-text-grey">
              <p>{l.name}</p>
              <p>
                {l.value} of {l.outOf}
              </p>
            </div>

            <progress
              key={i}
              className="progress is-info mb-3"
              value={l.value}
              max={l.outOf}
            >
              {l.value}/{l.outOf}
            </progress>
          </li>
        ))}
      </ul>
    </Collapsible>
  );
};

export default Levels;
