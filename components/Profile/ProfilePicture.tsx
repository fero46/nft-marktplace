import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import ImageLoader from "../Image/ImageLoader";

interface ProfilePictureProps {
  href: string;
  editable?: boolean;
}

const acceptedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/bmp",
];

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  href,
  editable = false,
}) => {
  const [hoveringPfp, setHoveringPfp] = useState<boolean>(false);
  const [pfpUrl, setPfpUrl] = useState<string>(href);
  const [loading, setLoading] = useState<boolean>(true);

  const pfpRef = useRef<HTMLInputElement>(null);

  const fileOnchangeHandler = (event: any) => {
    const file = event.target.files[0];
    setPfpUrl(URL.createObjectURL(file));
    //we need to send something to database after this event
  };

  return (
    <>
      <ImageLoader
        image={{
          src: pfpUrl,
          layout: "fill",
          objectFit: "cover",
          alt: "Profile Picture",
        }}
        circle
        containerClass="is-128x128"
        skeletonClass="is-absolute is-rounded"
        callback={() => setLoading(false)}
      >
        {editable && !loading && (
          <div
            className={clsx(
              "overlay is-flex is-justify-content-center",
              hoveringPfp && "active"
            )}
            onMouseEnter={() => setHoveringPfp(true)}
            onMouseLeave={() => setHoveringPfp(false)}
            onClick={() => pfpRef.current?.click()}
          >
            {hoveringPfp && (
              <FontAwesomeIcon icon={faPen} color="white" className="my-auto" />
            )}
            <input
              ref={pfpRef}
              type="file"
              name="file"
              accept={acceptedTypes.toString()}
              style={{ display: "none" }}
              onChange={(e) => fileOnchangeHandler(e)}
            />
          </div>
        )}
      </ImageLoader>

      {/* <figure className="image is-128x128">
        <Image
          className="is-rounded"
          src={pfpUrl}
          layout="fill"
          objectFit="cover"
          alt="Profile Picture"
        />
      </figure> */}
    </>
  );
};

export default ProfilePicture;
