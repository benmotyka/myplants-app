const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(
        {
            ...env,
            babel: {
                dangerouslyAddModulePathsToTranspile: [
                    "@miblanchard/react-native-slider",
                    "moti",
                ],
            },
        },
        argv
    );
    return config;
};
