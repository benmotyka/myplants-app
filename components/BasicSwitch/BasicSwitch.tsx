import React from "react";
import { TouchableOpacity } from "react-native";
import { BasicSwitchProps } from "./BasicSwitch.interface";
import {
  Container,
  PartWrapper,
  Wrapper,
  Label,
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
      <Label>{label}</Label>
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
