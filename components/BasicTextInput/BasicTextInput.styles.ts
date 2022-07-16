import styled from "styled-components/native";

import { colors } from "styles/colors";

export const InputWrapper = styled.View`
margin-top: 10px;
width: 100%;
position: relative;
padding-bottom: 20px;
max-width: 400px;
` 

export const Input = styled.TextInput<{errorBorder: boolean;}>`
width: 100%;
padding: 10px;
font-size: 20px;
border-radius: 5px;
font-family: 'Inter_200ExtraLight';
border: ${(props) =>
    props.errorBorder
      ? `1px solid ${colors.alert}`
      : `1px solid ${colors.grey}`};
`

export const InputLabel = styled.Text`
font-size: 18px;
font-family: 'Inter_300Light';
margin-bottom: 5px;
`

export const ErrorWrapper = styled.Text`
font-size: 12px;
font-family: 'Inter_300Light';
color: ${colors.alert};
margin-top: 3px;
position: absolute;
bottom: 0;
`