import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CheckboxLabel = styled.Text`
  margin-left: 10px;
  font-size: 18px;
  font-family: "Inter_300Light";
  color: ${({ theme }) => theme.text};
`;
