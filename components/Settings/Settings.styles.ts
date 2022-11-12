import styled from "styled-components/native";

export const HeaderWrapper = styled.View`
  /* prettier-ignore */
  borderBottomWidth: 1px;
  /* prettier-ignore */
  borderBottomColor: ${({ theme }) => theme.neutral};
`;

export const HeaderText = styled.Text`
  font-size: 24px;
  font-family: "Inter_300Light";
  margin-bottom: 5px;
  padding: 0 5px;
  color: ${({ theme }) => theme.text};
`;

export const ItemWrapper = styled.View`
  margin-top: 15px;
`;

export const ItemText = styled.Text`
  font-size: 20px;
  padding: 10px 5px;
  font-family: "Inter_200ExtraLight";
  color: ${({ theme }) => theme.text};
`;

export const SettingsSection = styled.View`
  width: 85%;
  margin-bottom: 50px;
  max-width: 400px;
`;
