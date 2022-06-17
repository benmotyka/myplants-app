import styled from "styled-components/native";
import { colors } from "../../styles/colors";

export const IconContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: ${colors.lightGrey};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  z-index: 4;
`;

export const MenuContainer = styled.TouchableOpacity`
  inset: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;
