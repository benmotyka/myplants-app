import "dotenv/config";

module.exports = {
    name: "Moje Rośliny",
    slug: "myplants",
    version: "1.0.0",
    privacy: "public",
    scheme: "com.benmotyka.myplants",
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
            foregroundImage: "./assets/icons/adaptive.png",
            backgroundColor: "#FFFFFF",
        },
        package: "com.benmotyka.myplants",
        googleServicesFile: "./keys/google-services.json",
        versionCode: 17,
    },
    web: {
        favicon: "./assets/icon.png",
    },
    plugins: ["sentry-expo"],
    extra: {
        apiUrl: process.env.API_URL,
        sentryDsn: process.env.SENTRY_DSN,
        basicAuthUsername: process.env.BASIC_AUTH_USERNAME,
        basicAuthPassword: process.env.BASIC_AUTH_PASSWORD,
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
