import styled from "styled-components/native";

export const Container = styled.View`
  width: 50%;
  height: 250px;
  padding: 3px;
`;

export const Wrapper = styled.View`
  border: 1px solid #000;
  height: 100%;
  position: relative;
`;

export const Image = styled.Image`
  width: 100%;
  height: 60%;
  position: absolute;
`;

export const Body = styled.View`
  position: absolute;
  height: 40%;
  top: 60%;
  width: 100%;
  padding: 5px;
`;

export const Header = styled.Text`
  fontsize: 16;
`;
