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
  justify-content: space-between;

  border-radius: 10px;
  border: 1px solid ${colors.grey};
  background-color: ${colors.grey};
`;

export const PartWrapper = styled.View<{ active?: boolean }>`
  width: 45%;
  padding: 15px;

  opacity: ${(props) => (props.active ? 1 : 0.1)};
  background-color: ${(props) => (props.active ? colors.white : colors.grey)};
  box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
  border-radius: 10px;
`;

export const ItemText = styled.Text`
  font-size: 15px;
  font-family: "Inter_300Light";
  text-align: center;
  color: ${colors.black};
`;
