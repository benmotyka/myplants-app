import styled from "styled-components/native";

import { colors } from "styles/colors";

export const FieldContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  max-width: 400px;
  border-radius: 5px;
  border: 1px solid ${colors.important};
`;

export const FieldValue = styled.Text`
  padding: 15px;
  font-size: 18px;
  font-family: "Inter_300Light";
  opacity: 0.8;
  width: 75%;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  width: 25%;
  paddingvertical: 10px;
  paddinghorizontal: 10px;
  font-family: "Inter_300Light";
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.mediumGrey};
  borderTopRightRadius: 5px;
  borderBottomRightRadius: 5px;
`;

export const InfoWrapper = styled.View`
  height: 20px;
`;

export const Info = styled.Text`
  font-family: "Inter_300Light";
  font-size: 14px;
  opacity: 0.6;
  text-align: center;
  padding: 5px 0;
`;
