import React from "react";
import { ActivityIndicator } from "react-native";

import { useAppConfigStore } from "store";
import { Wrapper } from "./styles";

interface Props {
    topMargin?: boolean;
}

const Loader = ({ topMargin }: Props): JSX.Element => {
    const appTheme = useAppConfigStore.persistent((state) => state.theme);

    return (
        <Wrapper topMargin={topMargin}>
            <ActivityIndicator
                size="large"
                color={appTheme === "dark" ? "white" : "black"}
            />
        </Wrapper>
    );
};

export default Loader;
