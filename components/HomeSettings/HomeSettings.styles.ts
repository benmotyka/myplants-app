import styled from "styled-components/native";

import { IconContainer } from "styles/shared";

export const IconWrapper = styled(IconContainer)`
  bottom: 20px;
  right: 20px;
  z-index: 20;
`;

export const MenuContainer = styled.TouchableOpacity`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
`;
