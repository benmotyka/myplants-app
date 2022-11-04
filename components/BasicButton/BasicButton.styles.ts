import styled from "styled-components/native";

import { colors } from "styles/colors";

export const ButtonWrapper = styled.TouchableOpacity<{
  warning?: boolean;
  important?: boolean;
}>`
  paddingVertical: 10px;
  paddingHorizontal: 10px;
  border-radius: 10px;
  background-color: ${colors.background};
  border: ${(props) =>
    props.warning
      ? `1px solid ${colors.warning}`
      : props.important
      ? `1px solid ${colors.primary}`
      : `1px solid ${colors.neutral}`};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
`;

export const ButtonText = styled.Text<{
  warning?: boolean;
  important?: boolean;
  disabled?: boolean;
}>`
  font-family: "Inter_300Light";
  font-size: 18px;
  color: ${(props) =>
    props.warning
      ? colors.warning
      : props.important
      ? colors.primary
      : colors.text};
  opacity: ${(props) => props.disabled ? 0.2 : 1};
`;
