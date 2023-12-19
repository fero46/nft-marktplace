import { faImage } from "@fortawesome/free-regular-svg-icons";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Translate from "../Text/Translate";

interface MediaUploaderProps {
  fileSetter: Dispatch<SetStateAction<File | undefined>>;
  typeSetter: Dispatch<SetStateAction<string | undefined>>;
  acceptedTypes: string[];
}

interface FileProps {
  file: File;
  url: string;
  type: string;
  extension: string;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  fileSetter,
  typeSetter,
  acceptedTypes,
}) => {
  const [file, setFile] = useState<FileProps>();
  const [draggedOn, setDraggedOn] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const getExtension = (filename: string) => {
    const parts = filename.split(".");
    return parts[parts.length - 1];
  };

  const getFileType = (extension: string): string => {
    const isAccepted = acceptedTypes
      .map((type) => type.split("/"))
      .filter((type) => type[1] === extension);
    return isAccepted.length ? isAccepted[0][0] : "";
  };

  const resolveFile = (accept: string[], file: any): void => {
    const extension = getExtension(file.name);
    const fileType = getFileType(extension);
    if (!accept.includes(fileType + "/" + extension)) return;
    const fileUrl = URL.createObjectURL(file);

    setFile({
      file: file,
      type: fileType,
      extension: extension,
      url: fileUrl,
    });
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length) {
      const _file = event.dataTransfer.files[0];

      resolveFile(acceptedTypes, _file);
    }
    setDraggedOn(false);
  };

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setDraggedOn(true);
  };

  const fileOnchangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event: any
  ) => {
    const _file = event.target.files[0];

    resolveFile(acceptedTypes, _file);
  };

  useEffect(() => {
    fileSetter(file?.file);
    typeSetter(file?.type);
  }, [file]);

  return (
    <figure
      className={clsx("nft-upload ml-0 mt-0", draggedOn && "dragged")}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDrag}
      onDragLeave={() => setDraggedOn(false)}
    >
      <div className="inner">
        {file ? (
          file.type === "image" ? (
            <div>
              <Image
                src={file.url}
                layout="fill"
                objectFit="contain"
                alt={file.file.name}
              />
            </div>
          ) : file.type === "video" ? (
            <video src={file.url}></video>
          ) : (
            file.type === "audio" && <div>audio</div>
          )
        ) : (
          <div>
            <FontAwesomeIcon icon={faImage} width={64} height={64} />
            <span>
              <Translate keyword="drop_here" />
            </span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept={acceptedTypes.toString()}
        style={{ display: "none" }}
        onChange={fileOnchangeHandler}
      />
    </figure>
  );
};

export default MediaUploader;
