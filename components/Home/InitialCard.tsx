import Image from "next/image";
import { StyleSheet, css } from "aphrodite";
import { useEffect, useState } from "react";

interface InitialCardProps {
  cardColor: string;
}

const InitialCard: React.FC<InitialCardProps> = ({ cardColor }) => {
  const [cardClass, setCardClass] = useState<string>("");
  const [buttonClass, setButtonClass] = useState<string>("");

  const styles = StyleSheet.create({
    cardAdditional: {
      backgroundColor: cardColor,
      color: "white",
    },
    buttonAdditional: {
      ":hover": {
        color: cardColor,
      },
      ":focus": {
        color: cardColor,
      },
    },
  });

  useEffect(() => {
    setCardClass("card " + css(styles.cardAdditional));
    setButtonClass(
      "button is-outlined is-white pr-6 pl-6 " + css(styles.buttonAdditional)
    );
  }, []);

  return (
    <div className={cardClass}>
      <div className="card-image">
        <figure className="image is-3by4">
          <Image
            src="https://via.placeholder.com/900x1600"
            alt="Placeholder image"
            layout="fill"
          />
        </figure>
      </div>
      <div className="card-content has-text-centered">
        <p className="title is-4 has-text-white">John Smith</p>
        <p className="subtitle is-6 has-text-white">
          Lorem ipsum dolor sit amet.
        </p>
        <button className={buttonClass}>Join</button>
      </div>
    </div>
  );
};

export default InitialCard;
