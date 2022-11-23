import React from "react";
import { TouchableOpacity } from "react-native";
import { SmallHeader } from "styles/shared";
import {
  Container,
  PartWrapper,
  Wrapper,
  ItemText,
} from "./styles";

interface Props {
  label: string;
  leftItemLabel: string;
  rightItemLabel: string;
  onClickLeftItem: () => void;
  onClickRightItem: () => void;
  activeItem: "left" | "right";
}

const BasicSwitch = ({
  label,
  leftItemLabel,
  rightItemLabel,
  onClickLeftItem,
  onClickRightItem,
  activeItem,
}: Props): JSX.Element => {
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
