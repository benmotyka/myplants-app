import styled from "styled-components/native";

import { colors } from "styles/colors";

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-family: "Inter_300Light";
  color: ${colors.black};
`;

export const Wrapper = styled.View`
  width: 100%;
  margin-top: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${colors.grey};
`;

export const PartWrapper = styled.View<{ active?: boolean }>`
  width: 50%;
  padding: 15px;

  background-color: ${colors.lightGrey};
  opacity: ${(props) => (props.active ? 1 : 0.1)};
`;

export const ItemText = styled.Text`
  font-size: 15px;
  font-family: 'Inter_300Light';
  text-align: center;
  color: ${colors.black};

`