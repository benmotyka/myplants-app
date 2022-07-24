module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            assets: "./assets",
            components: "./components",
            config: "./config",
            interfaces: "./interfaces",
            schemas: "./schemas",
            screens: "./screens",
            store: "./store",
            styles: "./styles",
            util: "./util",
            enums: "./enums",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
