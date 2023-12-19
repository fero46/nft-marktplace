import { FilterProps } from "../../components/Filter/AssetsFilter";
import Gallery from "../../components/Gallery/Gallery";

interface AssetsProps {
  filterProps: FilterProps;
  sortQuery: string[];
  typeQuery: string[];
}

const Assets: React.FC<AssetsProps> = ({
  filterProps,
  sortQuery,
  typeQuery,
}) => {
  return (
    <Gallery
      filterProps={filterProps}
      sortQuery={sortQuery}
      typeQuery={typeQuery}
    />
  );
};

export async function getServerSideProps({ query }: any) {
  return {
    props: {
      filterProps: {
        status: query.status ? query.status : [],
        collection: query.collection ? query.collection : [],
        price: {
          currencyName: query.currency ? [query.currency] : [],
          min: query.min ? [query.min] : [],
          max: query.max ? [query.max] : [],
        },
        chains: query.chains ? query.chains : [],
        category: query.category ? [query.category] : [],
        onSaleIn: query.onSaleIn ? query.onSaleIn : [],
      },
      sortQuery: query.sort ? query.sort : [],
      typeQuery: query.type ? query.type : [],
    },
  };
}

export default Assets;
