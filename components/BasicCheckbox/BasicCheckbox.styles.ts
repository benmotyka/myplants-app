import styled from "styled-components/native";

import { colors } from "styles/colors";

export const Container = styled.View`
display: flex;
flex-direction: row;
align-items: center;
gap: 10px;
`

export const CheckboxLabel = styled.Text`
font-size: 18px;
font-family: "Inter_300Light";
color: ${colors.black};
`