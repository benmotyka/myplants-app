import styled from "styled-components/native";
import { MotiView } from "moti";

import { colors } from "styles/colors";

export const ToastText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${colors.white};
  opacity: 0.8;
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

export const ToastWrapper = styled(MotiView)<{
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  color: ${colors.white};
  padding: 10px 20px;
`;
