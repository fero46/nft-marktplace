/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "via.placeholder.com",
      "placeholder.com",
      "rednft-dev.eu-west-1.elasticbeanstalk.com",
      "apitest123.red.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["en-US", "fr", "tr"],
    defaultLocale: "en-US",
  },
};
