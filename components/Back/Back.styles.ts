import styled from "styled-components/native";
import { colors } from "../../styles/colors";

export const IconContainer = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background-color: ${colors.lightGrey};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 2000;
`;
