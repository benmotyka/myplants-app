import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { IconWrapper } from "components/Back/Back.styles";
import { BackProps } from "components/Back/Back.interface";
import { colors } from "styles/colors";
import { ICON_SIZE_PX } from "config";

const Back = ({ navigation }: BackProps): JSX.Element => {
  return (
      <IconWrapper onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={ICON_SIZE_PX}
          color={colors.textLight}
        />
      </IconWrapper>
  );
};

export default Back;
