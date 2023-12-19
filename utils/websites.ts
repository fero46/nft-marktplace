import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";

interface Website {
  name: string;
  domain: string;
  //can be generated from  domain, or we won't need this if we get the data differently
  //or we don't need domain, regex still needs to be checked
  regex?: string;
  icon: IconDefinition;
}

const twitter: Website = {
  name: "Twitter",
  domain: "twitter.com",
  icon: faTwitter,
};

const twitch: Website = {
  name: "Twitch",
  domain: "twitch.tv",
  icon: faTwitch,
};

const instagram: Website = {
  name: "Instagram",
  domain: "instagram.com",
  icon: faInstagram,
};

const facebook: Website = {
  name: "Facebook",
  domain: "facebook.com",
  icon: faFacebook,
};

const youtube: Website = {
  name: "Youtube",
  domain: "youtube.com",
  icon: faYoutube,
};

const discord: Website = {
  name: "Discord",
  domain: "uhm",
  icon: faDiscord,
};

const other: Website = {
  name: "Website",
  domain: "",
  icon: faWindowMaximize,
};
