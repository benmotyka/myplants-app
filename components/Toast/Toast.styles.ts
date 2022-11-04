import styled from "styled-components/native";
import { MotiView } from "moti";

import { colors } from "styles/colors";

export const ToastText = styled.Text`
  font-size: 22px;
  text-align: center;
  color: ${colors.white}; // should be always white
  opacity: 0.9;
`;

export const ToastContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  top: 40px;
  z-index: 10;
`;

export const ToastCancelText = styled(ToastText)`
  margin-left: 20px;
  opacity: 0.6;
  font-size: 18px;
`;

export const ToastWrapper = styled(MotiView)<{
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  color: ${colors.backgroundLight};
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
