import { MotiView } from "moti";
import styled from "styled-components/native";
import { colors } from "styles/colors";

export const ReminderAnimationWrapper = styled(MotiView)`
  z-index: 2;
`;

export const IconWrapper = styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 3px;
  border-radius: 24px;
  background-color: ${colors.alert};
`;
