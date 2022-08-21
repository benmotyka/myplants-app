import React from "react";
import { TouchableOpacity } from "react-native";
import { SmallHeader } from "styles/shared";
import { BasicSwitchProps } from "./BasicSwitch.interface";
import {
  Container,
  PartWrapper,
  Wrapper,
  ItemText,
} from "./BasicSwitch.styles";

const BasicSwitch = ({
  label,
  leftItemLabel,
  rightItemLabel,
  onClickLeftItem,
  onClickRightItem,
  activeItem,
}: BasicSwitchProps): JSX.Element => {
  return (
    <Container>
      <SmallHeader>{label}</SmallHeader>
      <Wrapper>
        <PartWrapper
          active={activeItem === "left"}
        >
          <TouchableOpacity onPress={onClickLeftItem}>
            <ItemText>{leftItemLabel}</ItemText>
          </TouchableOpacity>
        </PartWrapper>
        <PartWrapper
          active={activeItem === "right"}
        >
          <TouchableOpacity onPress={onClickRightItem}>
            <ItemText>{rightItemLabel}</ItemText>
          </TouchableOpacity>
        </PartWrapper>
      </Wrapper>
    </Container>
  );
};

export default BasicSwitch;
