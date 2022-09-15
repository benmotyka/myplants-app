import "dotenv/config";

module.exports = {
  name: "My plants",
  slug: "myplants",
  version: "1.0.0",
  privacy: "public",
  description:
    "My plants is an application that allows you to track watering of your plants.",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  // @TODO: add splash screen
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.benmotyka.myplants",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.benmotyka.myplants",
    versionCode: 5,
  },
  web: {
    favicon: "./assets/icon.png",
  },
  plugins: ["sentry-expo"],
  extra: {
    apiUrl: process.env.API_URL,
    sentryDsn: process.env.SENTRY_DSN,
    text: '123',
    eas: {
      projectId: "9b57b4b7-39d0-474c-9ffb-3f5d617bcabd",
    },
  },
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: process.env.SENTRY_ORGANIZATION,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTHTOKEN,
        },
      },
    ],
  },
};
