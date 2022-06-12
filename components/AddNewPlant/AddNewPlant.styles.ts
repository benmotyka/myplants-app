import styled from "styled-components/native";
import { Container as PlantContainer } from "../Plant/Plant.styles";

export const Container = styled(PlantContainer)`
 display: flex;
 align-items: center;
 justify-content: center;
`;

export const Wrapper = styled.View`
  border: 1px solid #000;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;
