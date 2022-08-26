import styled from "styled-components/native";

import { colors } from "styles/colors";

export const HeaderWrapper = styled.View`
borderBottomWidth: 1px;
borderBottomColor: ${colors.grey};
`

export const HeaderText = styled.Text`
font-size: 24px;
font-family: 'Inter_300Light';
margin-bottom: 5px;
padding: 0 5px;
`

export const ItemWrapper = styled.View`
margin-top: 15px;
`

export const ItemText = styled.Text`
font-size: 20px;
padding: 10px 5px;
font-family: 'Inter_200ExtraLight';
`

export const SettingsSection = styled.View`
width: 85%;
margin-bottom: 50px;
max-width: 400px;
`