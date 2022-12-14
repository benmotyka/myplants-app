import React from "react";
import { ActivityIndicator } from "react-native";

import { useAppConfigStore } from "store";

const Loader = (): JSX.Element => {
    const appTheme = useAppConfigStore.persistent((state) => state.theme);

    return (
        <ActivityIndicator
            size="large"
            color={appTheme === "dark" ? "white" : "black"}
        />
    );
};

export default Loader;
