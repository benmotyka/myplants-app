import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { IconWrapper } from "components/Back/Back.styles";
import { BackProps } from "components/Back/Back.interface";
import { ICON_SIZE_PX } from "config";

const Back = ({ navigation }: BackProps): JSX.Element => {
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
