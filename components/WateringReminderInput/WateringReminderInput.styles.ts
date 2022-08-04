import styled from "styled-components/native";

import { colors } from "styles/colors";

export const Container = styled.View`
  width: 100%;
  position: relative;
  max-width: 400px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Text = styled.Text`
  font-family: "Inter_200ExtraLight";
  font-size: 18px;
`;

export const Input = styled.TextInput<{ errorBorder: boolean }>`
  width: 30px;
  font-size: 20px;
  font-family: "Inter_200ExtraLight";
  border: ${(props) =>
    props.errorBorder
      ? `1px solid ${colors.alert}`
      : `1px solid ${colors.grey}`};
  text-align: center;
`;
