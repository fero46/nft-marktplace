import { forwardRef } from "react";
import CopyDataButton from "../Buttons/CopyDataButton";
import Editable from "../Buttons/Editable";
import AddressDisplay from "../Text/AddressDisplay";
import ProfilePicture from "./ProfilePicture";

interface AboutProfileProps {
  account: string;
  username?: string;
  details?: string;
  joined?: string;
  editable?: boolean;
}

// function Name forwardRef((props, ref) => (
//   <h1 ref={ref} {...props} className="is-fit-content mb-1 mx-auto">
//     Username
//   </h1>
// ));

const AboutProfile: React.FC<AboutProfileProps> = ({
  account,
  username = "Unnamed",
  details,
  joined,
  editable = false,
}) => {
  return (
    <section className="pb-6 pfp">
      <div className="is-flex is-flex-direction-column is-justify-content-center">
        <div className="wrapper">
          <ProfilePicture
            editable={editable}
            href="https://via.placeholder.com/360x360"
          />
        </div>
      </div>
      <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center content">
        <h1 className="is-fit-content mb-1 mx-auto">Username</h1>
        <CopyDataButton data={account} buttonClass="button">
          <AddressDisplay address={account} />
        </CopyDataButton>
      </div>
    </section>
  );
};

export default AboutProfile;
