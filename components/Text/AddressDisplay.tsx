interface AddressDisplayProps {
  address: string;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ address }) => {
  const addressDisplay = address.slice(0, 6) + "..." + address.slice(-5, -1);
  return <>{addressDisplay}</>;
};

export default AddressDisplay;
