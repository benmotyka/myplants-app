import styled from "styled-components/native";
import { colors } from "../../styles/colors";

export const Container = styled.View`
  width: 50%;
  height: 250px;
  padding: 5px;
`;

export const Wrapper = styled.View`
  border: 1px solid ${colors.grey};
  height: 100%;
  position: relative;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.3);
`;

export const Image = styled.Image`
  width: 100%;
  height: 70%;
  position: absolute;
`;

export const SmallImage = styled.Image`
width: 15px;
height: 15px;
margin-right: 5px;
`
export const Body = styled.View`
  position: absolute;
  height: 30%;
  top: 70%;
  width: 100%;
  padding: 5px;
`;

export const Header = styled.Text`
  fontsize: 16;
`;

export const ItemsWrapper = styled.View`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
`