import Image from "next/image";
import logo from "../../public/meduse-nft.png";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="py-6 is-black">
      <div className="container">
        <Image src={logo} width={128} height={33} alt="Logo" />
      </div>
    </footer>
  );
};

export default Footer;
