import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;
