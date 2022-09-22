import styled from "styled-components/native";
import { colors } from "styles/colors";
import { SmallHeader } from "styles/shared";

export const ItemDateHeader = styled.Text`
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
padding: 10px 40px;
`

export const HistoryIcon = styled.Image`
width: 10px;
height: 15px;
margin-right: 5px;
`

export const HistoryImage = styled.Image`
width: 60%;
min-height: 200px;
margin: 0 auto;
`

export const ItemContainer = styled.View`
`

export const SectionContainer = styled.View`
width: 100%;
display: flex;
overflow-y: auto;
height: 90%;
`

export const SectionHeader = styled(SmallHeader)<{
    active: boolean
}>`
opacity: ${(props) => props.active ? 1 : 0.3};
`