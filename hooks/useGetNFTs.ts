import { useEffect, useState } from "react";
import { NFTObjectData } from "../external_api/nfts";
const host = process.env.NEXT_PUBLIC_API_URL;

export const useGetNFTs = ({
  status = "",
  owner = "",
  creator = "",
  name = "",
  category = "",
  asset_type = "",
  minPrice = "",
  maxPrice = "",
  collection = "",
  search = "",
  limit = 8,
  offset = "",
  order_type = "latest",
}) => {
  const [data, setData] = useState<NFTObjectData[]>();
  // const api = "http://rednft-dev.eu-west-1.elasticbeanstalk.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          parseInt(status) === 0
            ? await fetch(
                `${host}/api/v1/nfts?status=${status}&owner=${owner}&creator=${creator}&name=${name}&categoryName=${category}&asset_type=${asset_type}&collectionName=${collection}&search=${search}&limit=${limit}&offset=${offset}&order_type=${order_type}`
              )
            : await fetch(
                `${host}/api/v1/nfts?status=${status}&owner=${owner}&creator=${creator}&name=${name}&categoryName=${category}&asset_type=${asset_type}&minPrice=${minPrice}&maxPrice=${maxPrice}&collectionName=${collection}&search=${search}&limit=${limit}&offset=${offset}&order_type=${order_type}`
              );

        //check empty
        if (response.status === 204) {
          setData([]);
          return;
        }

        const responseData = await response.json();
        const nftObjectList: NFTObjectData[] = responseData;
        if (response.status === 200) setData(nftObjectList);
      } catch (error) {
        console.error("Unable to fetch data:", error);
      }
    };

    fetchData();
  }, [
    asset_type,
    category,
    collection,
    creator,
    limit,
    maxPrice,
    minPrice,
    name,
    offset,
    order_type,
    owner,
    setData,
    search,
    status,
  ]);

  return data;
};
