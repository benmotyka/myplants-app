import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { IconWrapper } from "./styles";
import { ICON_SIZE_PX } from "config";
import { Navigation } from "interfaces/Navigation";

interface Props extends Navigation {}

const Back = ({ navigation }: Props): JSX.Element => {
    const theme = useTheme();

    return (
        <IconWrapper onPress={() => navigation.goBack()}>
            <MaterialIcons
                name="keyboard-arrow-left"
                size={ICON_SIZE_PX}
                color={theme.textLight}
            />
        </IconWrapper>
    );
};

export default Back;
