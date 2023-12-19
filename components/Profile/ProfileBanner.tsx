import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRef, useState } from "react";
import Image from "next/image";
import ImageLoader from "../Image/ImageLoader";
import Layout from "../Layout/Layout";

interface ProfileBannerProps {
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

const ProfileBanner: React.FC<ProfileBannerProps> = ({
  href,
  editable = false,
  children,
}) => {
  const [hoveringBanner, setHoveringBanner] = useState<boolean>(false);
  const [bannerUrl, setBannerUrl] = useState<string>(href);
  const [loading, setLoading] = useState<boolean>(true);

  const bannerRef = useRef<HTMLInputElement>(null);

  const fileOnchangeHandler = (event: any) => {
    const file = event.target.files[0];
    setBannerUrl(URL.createObjectURL(file));
    //we need to send something to database after this event
  };

  return (
    <section className="banner">
      <ImageLoader
        image={{
          src: bannerUrl,
          layout: "fill",
          objectFit: "cover",
          alt: "Banner Image",
        }}
        callback={() => setLoading(false)}
      />

      {editable && !loading && (
        <>
          <div
            className={clsx(
              "overlay is-flex is-justify-content-center is-absolute",
              hoveringBanner && "active"
            )}
            onMouseEnter={() => setHoveringBanner(true)}
            onMouseLeave={() => setHoveringBanner(false)}
            onClick={() => bannerRef.current?.click()}
          >
            {hoveringBanner && (
              <FontAwesomeIcon icon={faPen} color="white" className="my-auto" />
            )}
          </div>
          <input
            ref={bannerRef}
            type="file"
            name="file"
            accept={acceptedTypes.toString()}
            style={{ display: "none" }}
            onChange={(e) => fileOnchangeHandler(e)}
          />
        </>
      )}
      <div className="addons">{children}</div>
    </section>
  );
};

export default ProfileBanner;
