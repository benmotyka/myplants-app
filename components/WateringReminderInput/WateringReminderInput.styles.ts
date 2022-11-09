import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  position: relative;
  max-width: 400px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: "Inter_200ExtraLight";
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

export const Input = styled.TextInput<{ errorBorder: boolean }>`
  margin: 0 10px;
  width: 35px;
  font-size: 20px;
  border-radius: 5px;
  font-family: "Inter_200ExtraLight";
  border: ${(props) =>
    props.errorBorder
      ? `1px solid ${props.theme.warning}`
      : `1px solid ${props.theme.neutral}`};
  text-align: center;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundLight};
`;

export const ErrorContainer = styled.View`
  height: 20px;
  text-align: center;
`;
