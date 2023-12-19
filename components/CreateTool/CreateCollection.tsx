import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { CollectionProps } from "../../utils/types";
import LoadingButton from "../Buttons/LoadingButton";
import Form from "../Form";
import MediaUploader from "../Form/MediaUploader";
import RequiredFields from "../Form/RequiredFields";
import TextInput from "../Form/TextInput";
import Translate, { useTranslate } from "../Text/Translate";

interface CreateCollectionProps {
  setter: Dispatch<SetStateAction<CollectionProps[]>>;
}

const acceptedCollectionImageUploads = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/bmp",
];

const CreateCollection: React.FC<CreateCollectionProps> = ({ setter }) => {
  const [file, setFile] = useState<File>();
  const [fileType, setFileType] = useState<string>();
  const [name, setName] = useState<string>();
  const [symbol, setSymbol] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const namePlaceholder = useTranslate("name_placeholder");
  const toastS = useTranslate("collection_created");

  const handleCreateCollection = async () => {
    setLoading(true);
    // this will come from backend and will be async
    const temp: CollectionProps = {
      name: name ? name : "",
      symbol: symbol ? symbol : "",
      description: description,
      imageSrc: "https://via.placeholder.com/300",
    };
    toast.success(toastS);
    setLoading(false);
    setter((prev) => [...prev, temp]);
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length < 5)
      setSymbol(e.currentTarget.value.toUpperCase());
    else toast.warning("Max: 4");
  };

  return (
    <>
      <h1>
        <Translate keyword="collection" />
      </h1>
      <RequiredFields />
      <Form label="image" description="create_collection_image" required>
        <MediaUploader
          fileSetter={setFile}
          typeSetter={setFileType}
          acceptedTypes={acceptedCollectionImageUploads}
        />
      </Form>
      <Form label="name" required description="create_collection_name">
        <TextInput
          placeholder={namePlaceholder}
          getter={name}
          setter={setName}
          required
        />
      </Form>
      <Form label="symbol" required>
        <input
          className="input"
          type="text"
          placeholder="MON"
          onChange={handleSymbolChange}
          value={symbol}
        />
        {symbol != undefined && !symbol.length && (
          <small className="has-text-danger">
            <Translate keyword="required_error" />
          </small>
        )}
      </Form>
      <Form label="description">
        <textarea
          className="textarea"
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
        ></textarea>
      </Form>
      <LoadingButton
        loading={loading}
        onClick={handleCreateCollection}
        className="button is-fullwidth is-info"
        disabled={!file || !name || !symbol}
      >
        <Translate keyword="create_collection" />
      </LoadingButton>
    </>
  );
};

export default CreateCollection;
