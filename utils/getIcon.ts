import {
  faFacebook,
  faTwitter,
  faInstagram,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

export default function getIcon(s: string) {
  switch (s) {
    case "Twitter":
      return faTwitter;
    case "Facebook":
      return faFacebook;
    case "Instagram":
      return faInstagram;
    case "Discord":
      return faDiscord;
    default:
      return faDiscord;
  }
}
