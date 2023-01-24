import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useAppConfigStore } from "store";
import { Wrapper } from "./styles";

const StatusBar = (): JSX.Element => {
    const appTheme = useAppConfigStore.persistent((state) => state.theme);

    return (
        <Wrapper>
            <ExpoStatusBar style={appTheme === "dark" ? "light" : "dark"} />
        </Wrapper>
    );
};

export default StatusBar;
