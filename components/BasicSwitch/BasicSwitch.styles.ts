import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 25px;
`;

export const Wrapper = styled.View`
  width: 100%;
  margin-top: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
  border: ${({ theme }) => `1px solid ${theme.neutral}`};
  background-color: ${({ theme }) => theme.neutral};
`;

export const PartWrapper = styled.View<{ active?: boolean }>`
  width: 45%;
  padding: 15px;

  opacity: ${(props) => (props.active ? 1 : 0.1)};
  background-color: ${(props) => (props.active ? props.theme.backgroundLight : props.theme.neutral)};
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export const ItemText = styled.Text`
  font-size: 15px;
  font-family: "Inter_300Light";
  text-align: center;
  color: ${({ theme }) => theme.text};
`;
