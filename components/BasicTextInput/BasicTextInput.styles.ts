import styled from "styled-components/native";
import { MotiView } from "moti";

export const InputWrapper = styled.View`
  margin-top: 10px;
  width: 100%;
  position: relative;
  padding: 0 20px;
  max-width: 400px;
`;

export const Input = styled.TextInput<{ errorBorder: boolean }>`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  font-family: "Inter_200ExtraLight";
  border: ${(props) =>
    props.errorBorder
      ? `1px solid ${props.theme.warning}`
      : `1px solid ${props.theme.neutral}`};
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundLight};
`;

export const InputLabel = styled.Text`
  font-size: 20px;
  font-family: "Inter_300Light";
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
`;

export const ErrorContainer = styled.View`
  height: 20px;
  width: 100%;
`;

export const ErrorWrapper = styled(MotiView)``;

export const ErrorText = styled.Text`
  font-size: 11px;
  font-family: "Inter_300Light";
  color: ${({ theme }) => theme.warning};
  margin-top: 3px;
`;
