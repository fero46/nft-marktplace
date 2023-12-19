import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

interface ImageLoaderProps {
  image: ImageProps;
  containerClass?: string;
  skeletonClass?: string;
  circle?: boolean;
  callback?: Function;
  showOnLoad?: boolean;
  debug?: boolean;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  image,
  containerClass,
  skeletonClass,
  circle,
  callback,
  showOnLoad = true,
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  //can be further customized
  const handleLoadingComplete = () => {
    if (showOnLoad) {
      setLoading(false);
    }
    if (callback) callback();
  };

  return (
    <figure className={clsx("image", containerClass)}>
      {loading && (
        <Skeleton
          circle={circle}
          style={{ height: "100%" }}
          className={skeletonClass}
        />
      )}
      <Image
        {...image}
        className={clsx(loading && "invisible", circle && "is-rounded")}
        onLoadingComplete={handleLoadingComplete}
      />
      {children}
    </figure>
  );
};

export default ImageLoader;
