import styled from "styled-components/native";
import { colors } from "styles/colors";

export const HeaderWrapper = styled.View`
padding: 0 25px;
width: 100%;
`

export const ItemDateHeader = styled.Text`
width: 100%;
background-color: ${colors.lightGrey};
padding: 10px 25px;
font-size: 18px;
font-family: "Inter_300Light";
`

export const ActionText = styled.Text`
font-size: 14px;
font-family: "Inter_300Light";
`

export const ItemWrapper = styled.View`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
padding: 10px 40px;
`

export const HistoryIcon = styled.Image`
width: 10px;
height: 15px;
margin-right: 5px;
`