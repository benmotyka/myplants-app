import React from "react";
import { IconContainer } from "./Back.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { BackProps } from "./Back.interface";

const ICON_SIZE_PX = 24;

const Back = ({ navigation }: BackProps): JSX.Element => {
  return (
      <IconContainer onPress={() => navigation.goBack()}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={ICON_SIZE_PX}
          color={colors.lightBlack}
        />
      </IconContainer>
  );
};

export default Back;
